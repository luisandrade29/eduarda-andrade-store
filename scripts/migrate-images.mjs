// One-off migration: moves existing base64 product images (stored as
// `images[].src` data URLs) into Supabase Storage and rewrites each image
// entry to `{ id, label, url, path }`.
//
// Usage:
//   SUPABASE_URL=https://ujftpbcqypijcsnooogf.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=xxxx \
//   node scripts/migrate-images.mjs
//
// The service role key is required because rewriting every product can be
// slow and this script bypasses RLS. Get it from
// Project Settings → API → service_role (keep it secret, never commit it).

import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars.');
  process.exit(1);
}

const supabase = createClient(url, key);
const BUCKET = 'product-images';

function dataUrlToBuffer(dataUrl) {
  const match = /^data:(.+);base64,(.*)$/.exec(dataUrl);
  if (!match) return null;
  const [, mime, base64] = match;
  return { mime, buffer: Buffer.from(base64, 'base64') };
}

function extFromMime(mime) {
  if (mime.includes('png')) return 'png';
  if (mime.includes('webp')) return 'webp';
  if (mime.includes('gif')) return 'gif';
  return 'jpg';
}

async function main() {
  const { data: products, error } = await supabase.from('products').select('*');
  if (error) throw error;

  console.log(`Found ${products.length} products.`);

  for (const product of products) {
    const images = product.images || [];
    let changed = false;

    const newImages = [];
    for (const img of images) {
      if (img.url && !img.src) {
        newImages.push(img);
        continue;
      }

      const decoded = dataUrlToBuffer(img.src || '');
      if (!decoded) {
        newImages.push(img);
        continue;
      }

      const ext = extFromMime(decoded.mime);
      const path = `${product.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, decoded.buffer, { contentType: decoded.mime, upsert: false });

      if (uploadError) {
        console.error(`  ✗ ${product.name}: ${uploadError.message}`);
        newImages.push(img);
        continue;
      }

      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
      newImages.push({ id: img.id, label: img.label, url: pub.publicUrl, path });
      changed = true;
    }

    if (changed) {
      const { error: updateError } = await supabase
        .from('products')
        .update({ images: newImages })
        .eq('id', product.id);

      if (updateError) {
        console.error(`  ✗ Failed to update "${product.name}": ${updateError.message}`);
      } else {
        console.log(`  ✓ Migrated "${product.name}" (${newImages.length} image(s))`);
      }
    }
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

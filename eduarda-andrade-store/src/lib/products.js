import { supabase, PRODUCT_IMAGES_BUCKET } from './supabaseClient';

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error('Erro ao carregar produtos');
  return data;
}

export async function createProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price === '' ? null : product.price,
      description: product.description,
      images: product.images,
      featured: product.featured,
    })
    .select();
  if (error) throw new Error('Erro ao adicionar produto');
  return data[0];
}

export async function updateProduct(id, product) {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select();
  if (error) throw new Error('Erro ao atualizar produto');
  return data[0];
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw new Error('Erro ao apagar produto');
}

// Uploads an image file to Supabase Storage and returns its public URL.
export async function uploadProductImage(file, productId) {
  const ext = file.name.split('.').pop();
  const fileName = `${productId || 'new'}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (error) throw new Error('Erro ao enviar imagem: ' + error.message);

  const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(fileName);
  return { url: data.publicUrl, path: fileName };
}

export async function deleteProductImage(path) {
  if (!path) return;
  await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([path]);
}

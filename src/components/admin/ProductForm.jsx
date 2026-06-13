import { useRef, useState } from 'react';
import { COLORS, FONT_SERIF } from '../../theme';
import { CATEGORIES, CATEGORY_MAP } from '../../data/categories';
import { PrimaryButton, OutlineButton } from '../Button';
import { uploadProductImage, deleteProductImage } from '../../lib/products';

const inputStyle = {
  width: '100%',
  padding: '0.7rem 0.9rem',
  border: `1px solid ${COLORS.border}`,
  background: COLORS.white,
  fontSize: '0.85rem',
  marginBottom: '1rem',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.68rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: COLORS.textMuted,
  marginBottom: '0.4rem',
};

export default function ProductForm({ initial, onSave, onCancel, isMobile, saving }) {
  const [form, setForm] = useState(() =>
    initial
      ? { ...initial, images: initial.images || [] }
      : {
          name: '',
          category: 'mulher-casual',
          subcategory: '',
          price: '',
          description: '',
          images: [],
          featured: false,
        }
  );
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  const cat = CATEGORY_MAP[form.category];
  const cover = form.images[0]?.url || null;

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    try {
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          alert(`"${file.name}" excede 5MB.`);
          continue;
        }
        const { url, path } = await uploadProductImage(file, initial?.id);
        const label = file.name.replace(/\.[^.]+$/, '');
        setForm((f) => ({
          ...f,
          images: [...f.images, { id: Date.now() + Math.random(), label, url, path }],
        }));
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = async (id) => {
    const img = form.images.find((i) => i.id === id);
    setForm((f) => ({ ...f, images: f.images.filter((i) => i.id !== id) }));
    if (img?.path) await deleteProductImage(img.path);
  };

  const updateLabel = (id, label) => {
    setForm((f) => ({
      ...f,
      images: f.images.map((i) => (i.id === id ? { ...i, label } : i)),
    }));
  };

  const submit = () => {
    if (!form.name.trim()) {
      alert('Nome obrigatório.');
      return;
    }
    onSave(form);
  };

  return (
    <div style={{ background: COLORS.white, padding: isMobile ? '1.2rem' : '2rem', maxWidth: 860 }}>
      <h2
        style={{
          fontFamily: FONT_SERIF,
          fontSize: '1.8rem',
          fontWeight: 300,
          marginBottom: '1.5rem',
        }}
      >
        {initial ? '✏️ Editar Artigo' : '➕ Adicionar Artigo'}
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr',
          gap: '1.5rem',
        }}
      >
        <div>
          <label style={labelStyle}>Imagens / Cores ({form.images.length})</label>
          <div
            style={{
              width: '100%',
              aspectRatio: '1',
              background: cat ? `${cat.color}22` : COLORS.bgAlt,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.8rem',
              overflow: 'hidden',
            }}
          >
            {cover ? (
              <img src={cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '3rem' }}>{cat?.emoji}</span>
            )}
          </div>

          {form.images.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.8rem' }}>
              {form.images.map((img) => (
                <div key={img.id} style={{ position: 'relative' }}>
                  <img
                    src={img.url}
                    alt={img.label}
                    style={{ width: 60, height: 60, objectFit: 'cover', border: `1px solid ${COLORS.border}` }}
                  />
                  <button
                    onClick={() => removeImage(img.id)}
                    style={{
                      position: 'absolute',
                      top: -6,
                      right: -6,
                      background: COLORS.text,
                      color: COLORS.white,
                      border: 'none',
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: '0.6rem',
                      lineHeight: 1,
                    }}
                  >
                    ✕
                  </button>
                  <input
                    value={img.label || ''}
                    onChange={(e) => updateLabel(img.id, e.target.value)}
                    placeholder="Cor"
                    style={{
                      width: 60,
                      marginTop: 2,
                      fontSize: '0.6rem',
                      padding: '0.15rem',
                      border: `1px solid ${COLORS.border}`,
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            disabled={uploading}
            style={{ fontSize: '0.78rem' }}
          />
          {uploading && (
            <p style={{ fontSize: '0.75rem', color: COLORS.textMuted, marginTop: '0.4rem' }}>
              A enviar imagem(ns)...
            </p>
          )}

          <label style={{ ...labelStyle, marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set('featured', e.target.checked)}
            />
            ⭐ Mostrar em Destaque
          </label>
        </div>

        <div>
          <label style={labelStyle}>Nome</label>
          <input
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            style={inputStyle}
            placeholder="Ex: Vestido floral"
          />

          <label style={labelStyle}>Categoria</label>
          <select
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
            style={inputStyle}
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.emoji} {c.label}
              </option>
            ))}
          </select>

          <label style={labelStyle}>Subcategoria</label>
          <input
            value={form.subcategory || ''}
            onChange={(e) => set('subcategory', e.target.value)}
            style={inputStyle}
            placeholder="Ex: Vestidos"
          />

          <label style={labelStyle}>Preço (Kz)</label>
          <input
            type="number"
            value={form.price ?? ''}
            onChange={(e) => set('price', e.target.value)}
            style={inputStyle}
            placeholder="Ex: 15000"
          />

          <label style={labelStyle}>Descrição</label>
          <textarea
            value={form.description || ''}
            onChange={(e) => set('description', e.target.value)}
            style={{ ...inputStyle, height: 100, resize: 'vertical' }}
          />

          <div style={{ display: 'flex', gap: '0.7rem' }}>
            <PrimaryButton onClick={submit} style={{ flex: 1 }} disabled={saving}>
              {saving ? 'A guardar...' : initial ? 'Guardar' : 'Adicionar'}
            </PrimaryButton>
            <OutlineButton onClick={onCancel} style={{ flex: 1 }}>
              Cancelar
            </OutlineButton>
          </div>
        </div>
      </div>
    </div>
  );
}

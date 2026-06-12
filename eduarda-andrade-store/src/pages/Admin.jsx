import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS, FONT_SERIF } from '../theme';
import { CATEGORIES, CATEGORY_MAP } from '../data/categories';
import { useIsMobile } from '../hooks/useIsMobile';
import { useProducts } from '../hooks/useProducts';
import { PrimaryButton, OutlineButton } from '../components/Button';
import ProductForm from '../components/admin/ProductForm';
import { createProduct, updateProduct, deleteProduct, deleteProductImage } from '../lib/products';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'lumiere2025';

const inputStyle = {
  width: '100%',
  maxWidth: 280,
  padding: '0.7rem 0.9rem',
  border: `1px solid ${COLORS.border}`,
  background: COLORS.white,
  fontSize: '0.85rem',
  marginBottom: '0.4rem',
};

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('ea_admin') === '1');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('ea_admin', '1');
      setAuthed(true);
      setError('');
    } else {
      setError('Password incorreta.');
    }
  };

  if (!authed) {
    return (
      <div
        style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 320, width: '100%' }}>
          <h1 style={{ fontFamily: FONT_SERIF, fontSize: '1.8rem', marginBottom: '0.3rem' }}>
            Eduarda Andrade
          </h1>
          <p
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: COLORS.textMuted,
              marginBottom: '1.5rem',
            }}
          >
            Painel Admin
          </p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            style={{ ...inputStyle, maxWidth: '100%', marginBottom: '0.4rem' }}
          />
          {error && <p style={{ color: COLORS.accent, fontSize: '0.78rem', marginBottom: '0.8rem' }}>{error}</p>}
          <PrimaryButton onClick={handleLogin} style={{ width: '100%' }}>
            Entrar
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { products, loading, reload } = useProducts();
  const [view, setView] = useState('list'); // list | add | edit
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSave = async (form) => {
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        category: form.category,
        subcategory: form.subcategory,
        price: form.price,
        description: form.description,
        images: form.images,
        featured: form.featured,
      };
      if (editing) {
        await updateProduct(editing.id, payload);
        notify('✅ Artigo atualizado!');
      } else {
        await createProduct(payload);
        notify('✅ Artigo adicionado!');
      }
      await reload();
      window.dispatchEvent(new Event('products_updated'));
      setView('list');
      setEditing(null);
    } catch (err) {
      notify('❌ ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm('Apagar este artigo?')) return;
    try {
      await deleteProduct(product.id);
      for (const img of product.images || []) {
        if (img.path) await deleteProductImage(img.path);
      }
      await reload();
      window.dispatchEvent(new Event('products_updated'));
      notify('✅ Artigo apagado.');
    } catch {
      notify('❌ Erro.');
    }
  };

  const toggleFeatured = async (product) => {
    try {
      await updateProduct(product.id, { featured: !product.featured });
      await reload();
      notify('⭐ Destaque atualizado!');
    } catch {
      notify('❌ Erro.');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('ea_admin');
    navigate('/');
    window.location.reload();
  };

  if (view === 'add' || view === 'edit') {
    return (
      <div style={{ padding: isMobile ? '1.2rem' : '2rem' }}>
        <ProductForm
          initial={editing}
          onSave={handleSave}
          onCancel={() => {
            setView('list');
            setEditing(null);
          }}
          isMobile={isMobile}
          saving={saving}
        />
      </div>
    );
  }

  const stats = [
    { label: 'Artigos', val: products.length, icon: '📦' },
    { label: 'Destaque', val: products.filter((p) => p.featured).length, icon: '⭐' },
    {
      label: 'Com Imagem',
      val: products.filter((p) => p.images?.length > 0).length,
      icon: '🖼️',
    },
    { label: 'Categorias', val: CATEGORIES.length, icon: '🏷️' },
  ];

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: isMobile ? '1.2rem' : '2rem 3rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h1 style={{ fontFamily: FONT_SERIF, fontSize: '1.8rem', fontWeight: 300, marginBottom: '0.3rem' }}>
            Eduarda Andrade
          </h1>
          <p
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: COLORS.textMuted,
            }}
          >
            Painel Admin
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <OutlineButton onClick={() => navigate('/')} style={{ fontSize: '0.7rem' }}>
            Ver Loja
          </OutlineButton>
          <OutlineButton onClick={logout} style={{ fontSize: '0.7rem' }}>
            Sair
          </OutlineButton>
        </div>
      </div>

      {message && (
        <div style={{ background: COLORS.bgAlt, padding: '0.7rem 1rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
          {message}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap: '0.8rem',
          marginBottom: '1.5rem',
        }}
      >
        {stats.map((s) => (
          <div key={s.label} style={{ background: COLORS.white, padding: '1rem', borderLeft: `3px solid ${COLORS.accent}` }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>{s.icon}</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 500 }}>{s.val}</div>
            <div style={{ fontSize: '0.7rem', color: COLORS.textMuted, textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.8rem' }}>
        <input
          placeholder="Pesquisar artigo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />
        <PrimaryButton onClick={() => setView('add')}>+ Adicionar Artigo</PrimaryButton>
      </div>

      {loading ? (
        <p style={{ color: COLORS.textMuted }}>A carregar...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: COLORS.textMuted, fontFamily: FONT_SERIF, fontSize: '1.1rem' }}>
          Nenhum artigo. Clica em "+ Adicionar Artigo"
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {filtered.map((p) => {
            const cat = CATEGORY_MAP[p.category];
            const cover = p.images?.[0]?.url;
            return (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  background: COLORS.white,
                  padding: '0.8rem',
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    flexShrink: 0,
                    background: cat ? `${cat.color}22` : COLORS.bgAlt,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {cover ? (
                    <img src={cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '1.4rem' }}>{cat?.emoji}</span>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 500, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.name}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: COLORS.textMuted }}>
                    {cat?.label} {p.price ? `· ${p.price} Kz` : ''}{' '}
                    {p.images?.length > 0 ? `· 🖼️ ${p.images.length}` : ''}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    onClick={() => toggleFeatured(p)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                    title="Destaque"
                  >
                    {p.featured ? '⭐' : '☆'}
                  </button>
                  <button
                    onClick={() => {
                      setEditing(p);
                      setView('edit');
                    }}
                    style={{ background: COLORS.text, color: COLORS.white, border: 'none', padding: '0.4rem 0.6rem', cursor: 'pointer', fontSize: '0.75rem' }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    style={{ background: 'none', border: `1px solid ${COLORS.border}`, padding: '0.4rem 0.6rem', cursor: 'pointer', fontSize: '0.75rem' }}
                  >
                    Apagar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { COLORS, FONT_SERIF } from '../theme';
import { CATEGORIES } from '../data/categories';
import { useIsMobile } from '../hooks/useIsMobile';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

export default function Catalog() {
  const isMobile = useIsMobile();
  const { products, loading, error } = useProducts();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('categoria') || '';

  const setCategory = (id) => {
    if (id) setSearchParams({ categoria: id });
    else setSearchParams({});
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = !activeCategory || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, activeCategory, search]);

  return (
    <section style={{ padding: isMobile ? '2rem 1.2rem 3rem' : '3rem 3rem 5rem' }}>
      <h1
        style={{
          fontFamily: FONT_SERIF,
          fontSize: isMobile ? '2rem' : '2.6rem',
          fontWeight: 300,
          marginBottom: '1.5rem',
        }}
      >
        Catálogo
      </h1>

      <input
        type="text"
        placeholder="Pesquisar artigo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          maxWidth: 320,
          padding: '0.7rem 1rem',
          border: `1px solid ${COLORS.border}`,
          background: COLORS.white,
          fontSize: '0.85rem',
          marginBottom: '1.2rem',
        }}
      />

      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
        }}
      >
        <CategoryChip
          label="Todas"
          active={!activeCategory}
          onClick={() => setCategory('')}
        />
        {CATEGORIES.map((cat) => (
          <CategoryChip
            key={cat.id}
            label={`${cat.emoji} ${cat.label}`}
            active={activeCategory === cat.id}
            onClick={() => setCategory(cat.id)}
          />
        ))}
      </div>

      {loading ? (
        <p style={{ color: COLORS.textMuted }}>A carregar...</p>
      ) : error ? (
        <p style={{ color: COLORS.accent }}>{error}</p>
      ) : filtered.length === 0 ? (
        <p
          style={{
            color: COLORS.textMuted,
            fontFamily: FONT_SERIF,
            fontSize: '1.3rem',
          }}
        >
          Nenhum artigo nesta categoria
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
            gap: isMobile ? '1rem' : '1.2rem',
          }}
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={setSelected} />
          ))}
        </div>
      )}

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function CategoryChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? COLORS.text : 'transparent',
        color: active ? COLORS.white : COLORS.text,
        border: `1px solid ${active ? COLORS.text : COLORS.border}`,
        padding: '0.5rem 0.9rem',
        fontSize: '0.78rem',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

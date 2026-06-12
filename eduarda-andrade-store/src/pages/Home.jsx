import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS, FONT_SERIF, whatsappLink } from '../theme';
import { CATEGORIES } from '../data/categories';
import { useIsMobile } from '../hooks/useIsMobile';
import { useProducts } from '../hooks/useProducts';
import { PrimaryButton } from '../components/Button';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

export default function Home() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const [selected, setSelected] = useState(null);

  const featured = products.filter((p) => p.featured);
  const highlight = (featured.length ? featured : products).slice(0, isMobile ? 4 : 8);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          minHeight: isMobile ? 'auto' : '85vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isMobile ? '2.5rem 1.2rem' : '3rem 4rem',
          }}
        >
          <p
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: COLORS.accent,
              marginBottom: '1rem',
              fontWeight: 500,
            }}
          >
            Nova Coleção — 2025
          </p>
          <h1
            style={{
              fontFamily: FONT_SERIF,
              fontSize: isMobile ? '2.6rem' : 'clamp(2.5rem, 4vw, 4rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: '1.2rem',
              color: COLORS.text,
            }}
          >
            Moda para
            <br />
            cada <em style={{ fontStyle: 'italic', color: COLORS.accent }}>momento</em>
            <br />
            da tua vida
          </h1>
          <p
            style={{
              color: COLORS.textMuted,
              lineHeight: 1.7,
              maxWidth: 340,
              marginBottom: '2rem',
              fontWeight: 300,
              fontSize: '0.9rem',
            }}
          >
            Roupas, calçado, acessórios e decoração para toda a família.
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <PrimaryButton onClick={() => navigate('/catalogo')}>Ver Catálogo</PrimaryButton>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#25D366',
                color: COLORS.white,
                padding: '0.85rem 1.2rem',
                textDecoration: 'none',
                fontSize: '0.76rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateRows: '1fr 1fr',
            height: isMobile ? 260 : 'auto',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg,#D4B8A8,#C4967C)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              borderBottom: `2px solid ${COLORS.bg}`,
            }}
          >
            <span style={{ fontSize: isMobile ? '2rem' : '2.5rem' }}>👗</span>
            <span
              style={{
                fontFamily: FONT_SERIF,
                color: COLORS.white,
                opacity: 0.9,
                letterSpacing: '0.1em',
                fontSize: isMobile ? '0.9rem' : '1rem',
              }}
            >
              Moda Feminina
            </span>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg,#B8A898,#9C7B68)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: isMobile ? '2rem' : '2.5rem' }}>🪑</span>
            <span
              style={{
                fontFamily: FONT_SERIF,
                color: COLORS.white,
                opacity: 0.9,
                letterSpacing: '0.1em',
                fontSize: isMobile ? '0.9rem' : '1rem',
              }}
            >
              Casa &amp; Decoração
            </span>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section style={{ padding: isMobile ? '2.5rem 1.2rem' : '4rem 3rem' }}>
        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontSize: isMobile ? '1.8rem' : '2.2rem',
            fontWeight: 300,
            marginBottom: '1.5rem',
          }}
        >
          Categorias
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(5,1fr)',
            gap: '0.7rem',
          }}
        >
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/catalogo?categoria=${cat.id}`)}
              style={{
                background: `${cat.color}22`,
                border: `1px solid ${cat.color}44`,
                padding: isMobile ? '1rem 0.8rem' : '1.5rem 1rem',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: isMobile ? '1.6rem' : '2rem', marginBottom: '0.4rem' }}>
                {cat.emoji}
              </div>
              <div style={{ fontSize: isMobile ? '0.72rem' : '0.8rem', fontWeight: 500 }}>
                {cat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Em Destaque */}
      {!loading && highlight.length > 0 && (
        <section style={{ padding: isMobile ? '0 1.2rem 2.5rem' : '0 3rem 4rem' }}>
          <h2
            style={{
              fontFamily: FONT_SERIF,
              fontSize: isMobile ? '1.8rem' : '2.2rem',
              fontWeight: 300,
              marginBottom: '1.5rem',
            }}
          >
            Em Destaque
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
              gap: isMobile ? '1rem' : '1.2rem',
            }}
          >
            {highlight.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={setSelected} />
            ))}
          </div>
        </section>
      )}

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

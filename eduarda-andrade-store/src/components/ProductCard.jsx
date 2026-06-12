import { COLORS, FONT_SERIF } from '../theme';
import { CATEGORY_MAP } from '../data/categories';

export default function ProductCard({ product, onSelect }) {
  const cat = CATEGORY_MAP[product.category];
  const images = product.images || [];
  const cover = images[0]?.url || null;

  return (
    <div
      onClick={() => onSelect(product)}
      style={{ cursor: 'pointer', background: COLORS.white }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '1',
          background: cat ? `${cat.color}22` : COLORS.bgAlt,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {cover ? (
          <img
            src={cover}
            alt={product.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span style={{ fontSize: '3rem' }}>{cat?.emoji || '🛍️'}</span>
        )}

        {product.featured && (
          <span
            style={{
              position: 'absolute',
              top: '0.5rem',
              left: '0.5rem',
              background: COLORS.accent,
              color: COLORS.white,
              fontSize: '0.58rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0.2rem 0.45rem',
            }}
          >
            Destaque
          </span>
        )}

        {images.length > 1 && (
          <span
            style={{
              position: 'absolute',
              bottom: '0.5rem',
              right: '0.5rem',
              background: 'rgba(44,40,37,0.7)',
              color: COLORS.white,
              fontSize: '0.62rem',
              padding: '0.2rem 0.5rem',
              borderRadius: 20,
            }}
          >
            +{images.length - 1} cores
          </span>
        )}
      </div>

      <div style={{ padding: '0.8rem 0.2rem' }}>
        <p
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: COLORS.textMuted,
            marginBottom: '0.2rem',
          }}
        >
          {cat?.label || product.category}
        </p>
        <p
          style={{
            fontFamily: FONT_SERIF,
            fontSize: '1.05rem',
            fontWeight: 400,
            marginBottom: '0.2rem',
          }}
        >
          {product.name}
        </p>
        {product.price && (
          <p style={{ fontSize: '0.85rem', color: COLORS.accent, fontWeight: 500 }}>
            {product.price} Kz
          </p>
        )}
      </div>
    </div>
  );
}

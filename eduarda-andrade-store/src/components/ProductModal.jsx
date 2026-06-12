import { useState } from 'react';
import { COLORS, FONT_SERIF, whatsappLink } from '../theme';
import { CATEGORY_MAP } from '../data/categories';
import { useIsMobile } from '../hooks/useIsMobile';
import { OutlineButton } from './Button';

export default function ProductModal({ product, onClose }) {
  const isMobile = useIsMobile();
  const cat = CATEGORY_MAP[product.category];
  const images = product.images || [];
  const [active, setActive] = useState(0);
  const cover = images[active]?.url || null;

  const message = `Olá! Tenho interesse no artigo "${product.name}"${
    images[active]?.label ? ` (${images[active].label})` : ''
  }.`;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(44,40,37,0.6)',
        zIndex: 400,
        display: 'flex',
        alignItems: isMobile ? 'flex-end' : 'center',
        justifyContent: 'center',
        padding: isMobile ? 0 : '2rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.white,
          maxWidth: isMobile ? '100%' : 900,
          width: '100%',
          maxHeight: isMobile ? '92vh' : '90vh',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        }}
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
          }}
        >
          {cover ? (
            <img
              src={cover}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <span style={{ fontSize: '4rem' }}>{cat?.emoji || '🛍️'}</span>
          )}

          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '0.8rem',
              right: '0.8rem',
              background: 'rgba(255,255,255,0.85)',
              border: 'none',
              width: 32,
              height: 32,
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: isMobile ? '1.5rem' : '2rem' }}>
          <p
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: COLORS.textMuted,
              marginBottom: '0.5rem',
            }}
          >
            {cat?.label || product.category}
            {product.subcategory ? ` · ${product.subcategory}` : ''}
          </p>
          <h2
            style={{
              fontFamily: FONT_SERIF,
              fontSize: isMobile ? '1.6rem' : '2rem',
              fontWeight: 300,
              marginBottom: '0.5rem',
            }}
          >
            {product.name}
          </h2>

          {product.price && (
            <p
              style={{
                fontSize: '1.2rem',
                color: COLORS.accent,
                fontWeight: 500,
                marginBottom: '1rem',
              }}
            >
              {product.price} Kz
            </p>
          )}

          {product.description && (
            <p
              style={{
                color: COLORS.textMuted,
                lineHeight: 1.7,
                fontWeight: 300,
                fontSize: '0.9rem',
                marginBottom: '1.2rem',
              }}
            >
              {product.description}
            </p>
          )}

          {images.length > 1 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <p
                style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: COLORS.textMuted,
                  marginBottom: '0.6rem',
                }}
              >
                Cores / Variantes
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {images.map((img, i) => (
                  <button
                    key={img.id || i}
                    onClick={() => setActive(i)}
                    style={{
                      width: 56,
                      height: 56,
                      padding: 0,
                      border:
                        i === active
                          ? `2px solid ${COLORS.accent}`
                          : `1px solid ${COLORS.border}`,
                      cursor: 'pointer',
                      overflow: 'hidden',
                      background: 'none',
                    }}
                    title={img.label}
                  >
                    <img
                      src={img.url}
                      alt={img.label || product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'block',
                background: '#25D366',
                color: COLORS.white,
                padding: '0.85rem 1rem',
                textDecoration: 'none',
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textAlign: 'center',
                fontWeight: 500,
              }}
            >
              💬 Encomendar via WhatsApp
            </a>
            <OutlineButton onClick={onClose} style={{ width: '100%', padding: '0.7rem' }}>
              Voltar
            </OutlineButton>
          </div>
        </div>
      </div>
    </div>
  );
}

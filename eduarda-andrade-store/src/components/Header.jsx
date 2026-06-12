import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COLORS, FONT_SERIF } from '../theme';
import { useIsMobile } from '../hooks/useIsMobile';

const NAV_LINKS = [
  ['/', 'Início'],
  ['/catalogo', 'Catálogo'],
  ['/contacto', 'Contacto'],
];

export default function Header() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const go = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        background: COLORS.bg,
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '1rem 1.2rem' : '1.2rem 3rem',
          maxWidth: 1400,
          margin: '0 auto',
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: FONT_SERIF,
            fontSize: isMobile ? '1.3rem' : '1.6rem',
            fontWeight: 300,
            color: COLORS.text,
            textDecoration: 'none',
          }}
        >
          Eduarda Andrade
        </Link>

        {isMobile ? (
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: COLORS.text,
            }}
          >
            {open ? '✕' : '☰'}
          </button>
        ) : (
          <nav style={{ display: 'flex', gap: '2.2rem', alignItems: 'center' }}>
            {NAV_LINKS.map(([path, label]) => (
              <button
                key={path}
                onClick={() => go(path)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: COLORS.text,
                  fontWeight: 400,
                }}
              >
                {label}
              </button>
            ))}
          </nav>
        )}
      </div>

      {isMobile && open && (
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            padding: '0.5rem 1.2rem 1.5rem',
            borderTop: `1px solid ${COLORS.border}`,
          }}
        >
          {NAV_LINKS.map(([path, label]) => (
            <button
              key={path}
              onClick={() => go(path)}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '1rem',
                padding: '0.6rem 0',
                color: COLORS.text,
              }}
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

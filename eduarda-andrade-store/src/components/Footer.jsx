import { useNavigate } from 'react-router-dom';
import { COLORS, CONTACT, FONT_SERIF, whatsappLink } from '../theme';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Footer() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <footer
      style={{
        background: COLORS.text,
        color: COLORS.textMuted,
        padding: isMobile ? '2.5rem 1.2rem 1.5rem' : '4rem 3rem 1.5rem',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '2rem',
          maxWidth: 1400,
          margin: '0 auto',
          marginBottom: '2rem',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: FONT_SERIF,
              fontSize: '1.5rem',
              color: COLORS.white,
              marginBottom: '0.5rem',
            }}
          >
            Eduarda Andrade
          </p>
          <p style={{ fontSize: '0.8rem', fontWeight: 300, lineHeight: 1.6 }}>
            Moda, acessórios e decoração para toda a família.
          </p>
        </div>

        <div>
          <h4
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: COLORS.border,
              marginBottom: '0.8rem',
            }}
          >
            Loja
          </h4>
          {[
            ['/', 'Início'],
            ['/catalogo', 'Catálogo'],
            ['/contacto', 'Contacto'],
          ].map(([path, label]) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                display: 'block',
                background: 'none',
                border: 'none',
                color: COLORS.textMuted,
                cursor: 'pointer',
                fontSize: '0.82rem',
                marginBottom: '0.4rem',
                padding: 0,
                textAlign: 'left',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div>
          <h4
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: COLORS.border,
              marginBottom: '0.8rem',
            }}
          >
            Contacto
          </h4>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'block',
              color: COLORS.textMuted,
              fontSize: '0.82rem',
              marginBottom: '0.4rem',
              textDecoration: 'none',
            }}
          >
            💬 +244 924 556 519
          </a>
          <a
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'block',
              color: COLORS.textMuted,
              fontSize: '0.82rem',
              marginBottom: '0.4rem',
              textDecoration: 'none',
            }}
          >
            📸 {CONTACT.instagramHandle}
          </a>
          <a
            href={CONTACT.facebookUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'block',
              color: COLORS.textMuted,
              fontSize: '0.82rem',
              textDecoration: 'none',
            }}
          >
            👥 Facebook
          </a>
          <a
            href={CONTACT.tiktokUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'block',
              color: COLORS.textMuted,
              fontSize: '0.82rem',
              marginTop: '0.4rem',
              textDecoration: 'none',
            }}
          >
            🎵 TikTok
          </a>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
        <p style={{ fontSize: '0.72rem', color: COLORS.textMuted }}>
          © 2025 Eduarda Andrade. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

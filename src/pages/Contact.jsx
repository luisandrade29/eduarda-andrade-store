import { COLORS, CONTACT, FONT_SERIF, whatsappLink } from '../theme';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Contact() {
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        padding: isMobile ? '2.5rem 1.2rem 4rem' : '4rem 3rem 6rem',
        maxWidth: 600,
      }}
    >
      <h1
        style={{
          fontFamily: FONT_SERIF,
          fontSize: isMobile ? '2rem' : '2.4rem',
          fontWeight: 300,
          marginBottom: '0.8rem',
        }}
      >
        Contacto
      </h1>
      <p
        style={{
          color: COLORS.textMuted,
          lineHeight: 1.7,
          marginBottom: '2rem',
          fontWeight: 300,
          fontSize: '0.9rem',
        }}
      >
        Entra em contacto para preços, disponibilidade e encomendas.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <ContactLink
          href={whatsappLink()}
          bg="#25D366"
          border="#1da851"
          icon="💬"
          label="WhatsApp"
          value="+244 924 556 519"
        />
        <ContactLink
          href={CONTACT.instagramUrl}
          bg="linear-gradient(135deg,#E1306C,#833AB4)"
          border="#C13584"
          icon="📸"
          label="Instagram"
          value={CONTACT.instagramHandle}
        />
        <ContactLink
          href={CONTACT.facebookUrl}
          bg="#1877F2"
          border="#0d6efd"
          icon="👥"
          label="Facebook"
          value="Eduarda Andrade"
        />
        <ContactLink
          href={CONTACT.tiktokUrl}
          bg="#000000"
          border="#333"
          icon="🎵"
          label="TikTok"
          value="@eduardaandrade2517"
        />
      </div>
    </section>
  );
}

function ContactLink({ href, bg, border, icon, label, value }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.2rem',
        background: bg,
        borderLeft: `3px solid ${border}`,
        textDecoration: 'none',
        color: COLORS.white,
      }}
    >
      <span style={{ fontSize: '1.3rem' }}>{icon}</span>
      <div>
        <p
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          {label}
        </p>
        <p style={{ fontSize: '0.95rem' }}>{value}</p>
      </div>
    </a>
  );
}

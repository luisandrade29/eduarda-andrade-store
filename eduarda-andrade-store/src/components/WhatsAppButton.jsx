import { whatsappLink } from '../theme';
import { useIsMobile } from '../hooks/useIsMobile';

export default function WhatsAppButton() {
  const isMobile = useIsMobile();

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        background: '#25D366',
        color: '#FFFFFF',
        textDecoration: 'none',
        padding: isMobile ? '0.85rem' : '0.85rem 1.2rem',
        borderRadius: 50,
        boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
      }}
    >
      <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>💬</span>
      {!isMobile && (
        <span style={{ fontSize: '0.8rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
          WhatsApp
        </span>
      )}
    </a>
  );
}

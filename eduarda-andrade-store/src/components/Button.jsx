import { COLORS } from '../theme';

export function PrimaryButton({ children, style, ...props }) {
  return (
    <button
      {...props}
      style={{
        background: COLORS.text,
        color: COLORS.white,
        border: 'none',
        padding: '0.85rem 1.6rem',
        fontSize: '0.76rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontWeight: 500,
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function OutlineButton({ children, style, ...props }) {
  return (
    <button
      {...props}
      style={{
        background: 'transparent',
        color: COLORS.text,
        border: `1px solid ${COLORS.text}`,
        padding: '0.85rem 1.6rem',
        fontSize: '0.76rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontWeight: 500,
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export const COLORS = {
  bg: '#FAF7F2',
  bgAlt: '#F5F0EB',
  border: '#E8DDD0',
  accent: '#C0715A',
  accentDark: '#A05A42',
  text: '#2C2825',
  textMuted: '#8C847C',
  white: '#FFFFFF',
};

export const FONT_SERIF = "'Cormorant Garamond', serif";
export const FONT_SANS = "'DM Sans', sans-serif";

export const CONTACT = {
  whatsapp: '244924556519',
  instagramUrl: 'https://www.instagram.com/eduardasoris',
  instagramHandle: '@eduardasoris',
  facebookUrl: 'https://www.facebook.com/share/1H2Pfo2iRR/?mibextid=wwXIfr',
  tiktokUrl: 'https://www.tiktok.com/@eduardaandrade2517?_r=1&_t=ZS-96zg28NZ9XN',
};

export const whatsappLink = (text) => {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};

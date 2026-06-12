export const CATEGORIES = [
  { id: 'mulher-casual', label: 'Mulher Casual', emoji: '👗', color: '#C4967C' },
  { id: 'mulher-moda', label: 'Mulher Moda', emoji: '✨', color: '#A888B8' },
  { id: 'homem', label: 'Homem', emoji: '👔', color: '#8898A8' },
  { id: 'crianca', label: 'Criança', emoji: '🧸', color: '#A0B870' },
  { id: 'calcado-mulher', label: 'Calçado Mulher', emoji: '👠', color: '#C0988E' },
  { id: 'calcado-homem', label: 'Calçado Homem', emoji: '👞', color: '#88909A' },
  { id: 'carteiras', label: 'Carteiras', emoji: '👜', color: '#B8906A' },
  { id: 'bijuteria', label: 'Bijuteria', emoji: '💍', color: '#C8A860' },
  { id: 'mobilia', label: 'Mobília', emoji: '🪑', color: '#8BA888' },
  { id: 'loucas', label: 'Louças', emoji: '🍽️', color: '#A8B8C8' },
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

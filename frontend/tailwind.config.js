const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './layouts/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './helpers/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(medicamento|darkness|lightness|dark|destaque|default|neutralDefault|institucionalDark|institucionalLight|greenLight|green|greenDark|greenDarkness|purple|medicamentoLightness)/,
      variants: ['hover'],
    },
  ],
  theme: {
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      '100%': '100% 100%',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      danger: '#f00',
      dark: '#3F6B9E',
      darkness: '#20344B',
      medicamento: '#A5A4F0',
      medicamentoLightness: '#E2E1FF',
      default: '#3587B7',
      destaque: '#73F7E8',
      lightness: '#D9EBFF',
      institucionalDark: '#3F6B9E',
      institucionalLight: '#DDECFF',
      neutralDefault: '#A6B9CC',
      neutralLight: '#F0F6FB',
      greenLight: '#BFFFBF',
      green: '#85EC6E',
      greenDark: '#19CA03',
      greenDarkness: '#1A6711',
      purple: '#676AAB',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '1.5xl': '1440px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: {
        'main-highlight':
          "url('https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-99004.jpg?w=2000')",
      },
      fontFamily: {
        roboto: 'Roboto',
        strawford_regular: '"strawfordregular", sans-serif',
        strawford_italic: '"strawfordregular_italic, sans-serif',
      },
      content: {
        arrowRight: 'url("/icons/arrow-right.svg")',
        darknessArrowRight: 'url("/icons/darkness-arrow-right.svg")',
      },
      fontSize: {
        0: '0px',
      },
      transitionDelay: {
        0: '0ms',
      },
      minWidth: (theme) => ({
        ...theme('spacing'),
      }),
      maxWidth: (theme) => ({
        ...theme('spacing'),
      }),
      minHeight: (theme) => ({
        ...theme('spacing'),
      }),
      maxHeight: (theme) => ({
        ...theme('spacing'),
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
    plugin(function ({ addVariant }) {
      addVariant('group-active', () => {
        return `:merge(.group).active &`
      })
    }),
  ],
}

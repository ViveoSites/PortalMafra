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
        /bg-(orange|neutrals|blue|lightgreen|darkgreen|midgreen|yellow|beige)-(50|100|200|300|400|500|600|700|800|900)/,
      variants: ['before', 'hover', 'focus', 'lg:hover'],
    },
    {
      pattern:
        /text-(orange|neutrals|blue|lightgreen|darkgreen|midgreen|yellow|beige)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /border-(orange|neutrals|blue|lightgreen|darkgreen|midgreen|yellow|beige)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /stroke-(orange|neutrals|blue|lightgreen|darkgreen|midgreen|yellow|beige)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /fill-(orange|neutrals|blue|lightgreen|darkgreen|midgreen|yellow|beige)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /columns-(2|3)/,
    },
    {
      pattern: /(bg|text|border)-(medicamento|darkness|dark|destaque|institucionalDark|institucionalLight|greenLight|greenDarkness)/,
      variants: ['hover'],
    },
  ],
  theme: {
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
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
      destaque: '#73F7E8',
      institucionalDark: '#3F6B9E',
      institucionalLight: '#DDECFF',
      neutralLight: '#F0F6FB',
      greenLight: '#BFFFBF',
      greenDarkness: '#1A6711',
      orange: {
        50: '#FFE2D8',
        100: '#F4C7B7',
        200: '#F1B8A1',
        300: '#EDA484',
        400: '#E78A5F',
        500: '#E0652F',
        600: '#C94D1C',
        700: '#AF421A',
        800: '#963716',
        900: '#812E13',
      },
      neutrals: {
        50: '#FFFFFF',
        100: '#E8E8EF',
        200: '#C3C3C9',
        300: '#A9A9B3',
        400: '#A9A9B3',
        500: '#44444C',
        600: '#32343B',
        700: '#2A2B31',
        800: '#1F2023',
        900: '#000000',
      },
      blue: {
        50: '#DAF7FA',
        100: '#B9EFF4',
        200: '#A1E3E9',
        300: '#89DDE4',
        400: '#66CBD4',
        500: '#099AA9',
        600: '#008B97',
        700: '#007681',
        800: '#00646D',
        900: '#00555D',
      },
      lightgreen: {
        50: '#EAF9E6',
        100: '#DDF6D6',
        200: '#DDF6D6',
        300: '#C4EFB6',
        400: '#B2E99D',
        500: '#96E27D',
        600: '#6AE075',
        700: '#48C85C',
        800: '#34AA40',
        900: '#288B12',
      },
      darkgreen: {
        50: '#BAE7CC',
        100: '#A3DFBB',
        200: '#85D4A5',
        300: '#5CC686',
        400: '#38A062',
        500: '#1F5836',
        600: '#1A4B2E',
        700: '#163F27',
        800: '#133621',
        900: '#102E1C',
      },
      midgreen: {
        50: '#DAF1DE',
        100: '#CEEDD2',
        200: '#BDE7C2',
        300: '#A7DFAD',
        400: '#8AD490',
        500: '#63C66D',
        600: '#39A94F',
        700: '#399D48',
        800: '#31863F',
        900: '#297137',
      },
      yellow: {
        50: '#FFE8BB',
        100: '#FFE4A7',
        200: '#FFDF8C',
        300: '#FFDC69',
        400: '#FFD93B',
        500: '#FFC400',
        600: '#DBA000',
        700: '#C78300',
        800: '#532800',
        900: '#452100',
      },
      beige: {
        400: '#F8F5EA',
        500: '#F5F1E3',
        600: '#E1D4AC',
        700: '#D1BB7D',
        800: '#C3A456',
        900: '#AE8C3E',
      },
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

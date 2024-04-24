const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        gray: {
          50: '#eaeaea',
          100: '#bebebf',
          200: '#9e9ea0',
          300: '#727275',
          400: '#56565a',
          500: '#2c2c31',
          600: '#28282d',
          700: '#1f1f23',
          800: '#18181b',
          900: '#121215',
        },
        purple: {
          50: '#f3eefc',
          100: '#d8cbf7',
          200: '#c6b2f3',
          300: '#ab8eee',
          400: '#9b79ea',
          500: '#8257e5',
          600: '#764fd0',
          700: '#5c3ea3',
          800: '#48307e',
          900: '#372560',
        },
        green: {
          50: '#e6fbef',
          100: '#b1f1ce',
          200: '#8cebb6',
          300: '#57e295',
          400: '#36dc81',
          500: '#04d361',
          600: '#04c058',
          700: '#039645',
          800: '#027435',
          900: '#025929',
        },
        app: {
          blue: {
            50: '#f0f8ff',
            100: '#e0f1fe',
            200: '#bbe3fc',
            300: '#7ecdfb',
            400: '#3ab4f6',
            500: '#109ae7',
            600: '#0487d9',
            700: '#0462a0',
            800: '#085384',
            900: '#0d466d',
            950: '#092c48',
          },
          yellow: {
            50: '#fefee8',
            100: '#ffffc2',
            200: '#fffa88',
            300: '#fff145',
            400: '#fde112',
            500: '#f2cb05',
            600: '#cd9b01',
            700: '#a36e05',
            800: '#87570c',
            900: '#724711',
            950: '#432505',
          },
          orange: {
            50: '#fffbec',
            100: '#fff6d4',
            200: '#ffe9a7',
            300: '#ffd770',
            400: '#ffba36',
            500: '#ffa30f',
            600: '#f28705',
            700: '#c86706',
            800: '#9e500e',
            900: '#7f420f',
            950: '#452005',
          },
          red: {
            50: '#fef3f2',
            100: '#ffe4e1',
            200: '#ffcec9',
            300: '#feaba3',
            400: '#fb7a6e',
            500: '#f24130',
            600: '#e03322',
            700: '#bd2618',
            800: '#9c2418',
            900: '#81241b',
            950: '#460e09',
          },
          green: {
            50: '#f1fcf3',
            100: '#ddfbe3',
            200: '#bef4cb',
            300: '#8beaa2',
            400: '#51d772',
            500: '#2abf4f',
            600: '#1d9c3d',
            700: '#1a7b32',
            800: '#1a612c',
            900: '#175027',
            950: '#072c12',
          },
          white: {
            50: '#f8f8f8',
            100: '#f2f2f2',
            200: '#dcdcdc',
            300: '#bdbdbd',
            400: '#989898',
            500: '#7c7c7c',
            600: '#656565',
            700: '#525252',
            800: '#464646',
            900: '#3d3d3d',
            950: '#292929',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        stripes:
          'linear-gradient(to bottom, #1E4DD9, #1E4DD9 12.5%, transparent 12.5%, transparent)',
      },

      fontSize: {
        '5xl': '2.5rem',
      },

      backgroundSize: {
        stripes: '100% 8px',
      },

      blur: {
        full: '194px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

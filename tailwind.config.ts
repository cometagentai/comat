import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        brand: {
          '50': '#eaf5ff', // Lightest tone, very close to white with a hint of blue
          '100': '#cbe9ff', // A soft, light blue
          '200': '#9ed7ff', // A medium-light blue
          '300': '#6dc2ff', // Slightly deeper blue
          '400': '#48afff', // Mid-level blue
          '500': '#2c99f4', // New `600` shifted to here
          '600': '#2c99f4', // Strong, vibrant blue
          '700': '#2179c7', // Slightly darker blue
          '800': '#185c99', // Deep blue
          '900': '#104477', // Darker tone, closer to navy
          '950': '#082944', // Darkest tone, nearly black with a blue hint
        },
        text: {
          light: '#000000',
          dark: '#ffffff',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
          active: 'hsl(var(--sidebar-active))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'shiny-text': 'shiny-text 8s infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
      },
      keyframes: {
        'shiny-text': {
          '0%, 90%, 100%': {
            'background-position': 'calc(-100% - var(--shiny-width)) 0',
          },
          '30%, 60%': {
            'background-position': 'calc(100% + var(--shiny-width)) 0',
          },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

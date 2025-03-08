import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5a6b46', // Olive green from the invitation
        secondary: '#a9b496', // Lighter olive green
        accent: '#d2c9b0', // Beige accent color
        background: '#f8f5eb', // Cream color for background
        text: '#5a6b46', // Olive green for text
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-montserrat)', 'sans-serif'],
        script: ['var(--font-dancing)', 'cursive'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'leaf-pattern': "url('/leaf-pattern.png')",
        'subtle-texture': "url('/subtle-pattern.png')",
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config; 
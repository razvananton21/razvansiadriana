/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B5A2B",    // Gold/Brown
        secondary: "#D4AF37",  // Gold
        accent: "#F5F5DC",     // Beige/Cream
        background: "#FFF8E7",  // Light cream
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


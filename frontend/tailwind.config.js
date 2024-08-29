/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-100%)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        bounceIn: {
          '0%, 100%': { transform: 'scale(0.9)', opacity: 0 },
          '50%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
        slideInLeft: 'slideInLeft 1s ease-out',
        bounceIn: 'bounceIn 1s ease-in-out',
      },
    },
  },
  plugins: [],
};

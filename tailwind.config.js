module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    safelist: ["rotate-6", "-rotate-6"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

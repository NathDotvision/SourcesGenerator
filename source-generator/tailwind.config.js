module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: true,
  theme: {
    extend: {
      colors: {
        main_color: "#d49c49",
        main_color_light: "#f0e3d9",
        secondary_color: "#60a3bc",
        secondary_color_light: "#d9e5eb",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

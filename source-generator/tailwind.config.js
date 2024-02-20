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
      screens: {
        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1920px",
        // => @media (min-width: 1280px) { ... }

        tele: "2000px",
        // => @media (min-width: 1500px) { ... }
      },
      keyframes: {
        "shadow-pulse": {
          "0%": { boxShadow: "0 0 5px #60a3bc" },
          "50%": { boxShadow: "0 0 20px #000, 0 0 15px #000" },
          "100%": { boxShadow: "0 0 5px #60a3bc" },
        },
      },
      animation: {
        "shadow-pulse": "shadow-pulse 4s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

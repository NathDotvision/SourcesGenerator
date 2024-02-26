/**
 * Configuration file for Tailwind CSS.
 * @module tailwind.config
 */

module.exports = {
  /**
   * Purge configuration for removing unused CSS classes.
   * @type {Array<string>}
   */
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  /**
   * Dark mode configuration.
   * @type {boolean}
   */
  darkMode: true,

  /**
   * Theme configuration.
   * @type {object}
   */
  theme: {
    /**
     * Extend the default color palette.
     * @type {object}
     */
    extend: {
      /**
       * Custom colors.
       * @type {object}
       */
      colors: {
        main_color: "#d49c49",
        main_color_light: "#f0e3d9",
        secondary_color: "#60a3bc",
        secondary_color_light: "#d9e5eb",
      },

      /**
       * Custom screen breakpoints.
       * @type {object}
       */
      screens: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1920px",
        tele: "2000px",
      },

      /**
       * Custom keyframes for animations.
       * @type {object}
       */
      keyframes: {
        "shadow-pulse": {
          "0%": { boxShadow: "0 0 5px #60a3bc" },
          "50%": { boxShadow: "0 0 20px #000, 0 0 15px #000" },
          "100%": { boxShadow: "0 0 5px #60a3bc" },
        },
      },

      /**
       * Custom animations.
       * @type {object}
       */
      animation: {
        "shadow-pulse": "shadow-pulse 4s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },

  /**
   * Variant configuration.
   * @type {object}
   */
  variants: {
    extend: {},
  },

  /**
   * Plugin configuration.
   * @type {Array}
   */
  plugins: [],
}

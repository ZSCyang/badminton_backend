
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  // theme: {
  //   extend: {
  //     backgroundColor: {
  //       base: "var(--color-base)",
  //       dark: "var(--color-dark)",
  //       primary: "var(--color-primary)",
  //       secondary: "var(--color-secondary)",
  //       muted: "var(--color-text-muted)",
  //     },
  //     textColor: {
  //       base: "var(--color-text-base)",
  //       muted: "var(--color-text-muted)",
  //       primary: "var(--color-primary)",
  //       secondary: "var(--color-secondary)",
  //     },
  //     borderColor: {
  //       base: "var(--color-border-base)",
  //     },
  //     shadowColor: {
  //       base: "var(--color-shadow-base)",
  //     },
  //     minWidth: {
  //       mobile: "350px",
  //     },
  //   },
  // },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ".el-button": {
          "background-color": "var(--el-button-bg-color,val(--el-color-white))",
        },
      });
    },
  ],
};

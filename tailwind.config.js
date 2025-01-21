/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1400px",
      },
      colors: {
        "main-100": "#F5F1E8",
        "main-200": "#E8DFCE",
        "main-300": "#DCC09B",
        "main-400": "#D1BCA1",
        "main-500": "#9F815B",
        "main-600": "#806049",
        "second-100": "#F2F6FF",
        "second-200": "#9AB6DB",
        "second-300": "#426680",
        "second-400": "#254154",
      },
      fontFamily: {
        sans: [
          "Noto Sans TC",
          "Roboto",
          "Segoe UI",
          "PingFang TC",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

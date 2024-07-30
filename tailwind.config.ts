import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        black: "#111111",
        "gray-100": "#F8F8F8",
        "gray-200": "#EEEEEE",
        "gray-300": "#E5E5E5",
        "gray-400": "#bbbbbb",
        "gray-50": "#F7F6F5",
        "gray-500": "#9E9E9E",
        "gray-600": "#757575",
        "gray-700": "#616161",
        "gray-800": "#424242",
        "gray-900": "#333",
        "orange-100": "#fffce1",
        "orange-200": "#ffcfb5",
        "orange-300": "#ffac88",
        "orange-400": "#FF8450",
        "orange-50": "#FFFAF8",
        "orange-500": "#e26f3e",
        "orange-600": "#a74f2a",
        "orange-700": "#884a30",
        "orange-800": "#663520",
        "orange-900": "#331a10",
        primary: "#FF8450",
        white: "#fff",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

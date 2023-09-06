/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}",
];
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1600px",
    },
  },
  extend: {
    colors: {
      darkText: "#D8D6D8",
      darkTwo: "#484748",
      darkMain: "#191819",
      darkColor: "#111216",
    },
  },
};

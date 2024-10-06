/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      textShadow: {
        default: "2px 2px 4px #000000",
      },
      colors: {
        customLight: "#f9fafb", // Màu tùy chỉnh cho chế độ sáng
        customDark: "#1f2937", // Màu tùy chỉnh cho chế độ tối
        customCyan: "#00bcd4", // Màu tùy chỉnh cho nút hay border
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "2px 2px 4px #000000",
        },
        ".text-shadow-md": {
          textShadow: "3px 3px 6px #000000",
        },
        ".text-shadow-lg": {
          textShadow: "4px 4px 8px #000000",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

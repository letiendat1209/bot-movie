/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        screens: {
            // breakpoint cho màn hình
            s360: '360px',
            s375: '375px',
            s412: '412px',
            s480: '480px',
            s640: '640px',
            s768: '768px',
            s800: '800px',
            s900: '900px',
            s1024: '1024px',
            s1280: '1280px',
            s1366: '1366px',
            s1440: '1440px',
            sm: '640px', // => @media (min-width: 640px) { ... }
            md: '768px', // => @media (min-width: 768px) { ... }
            lg: '1024px', // => @media (min-width: 1024px) { ... }
            xl: '1280px', // => @media (min-width: 1280px) { ...
            '2xl': '1536px', // => @media (min-width: 1536px) { ... }
        },
        extend: {
            textShadow: {
                default: '2px 2px 4px #000000',
            },
            colors: {
                customLight: '#f9fafb', // Màu tùy chỉnh cho chế độ sáng
                customDark: '#1c1c1e', // Màu tùy chỉnh cho chế độ tối ( màu đen tuyền)
                customCyan: '#00bcd4', // Màu tùy chỉnh cho nút hay border
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                '.text-shadow': {
                    textShadow: '2px 2px 4px #000000',
                },
                '.text-shadow-md': {
                    textShadow: '3px 3px 6px #000000',
                },
                '.text-shadow-lg': {
                    textShadow: '4px 4px 8px #000000',
                },
            };
            addUtilities(newUtilities);
        },
    ],
};

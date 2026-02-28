/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#D4AF37", // Gold
                "background-light": "#FFF9F6", // Soft ivory/blush
                "background-dark": "#1A1A1A",
                accent: "#F2D7D5", // Soft blush
            },
            fontFamily: {
                script: ["Great Vibes", "cursive"],
                serif: ["Cormorant Garamond", "serif"],
                sans: ["Montserrat", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "8px",
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}
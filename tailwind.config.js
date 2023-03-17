/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./gatsby-ssr.jsx",
        "./src/pages/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
        "./src/templates/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                portrait: "url('../images/front-portrait.jpg')",
            },
            maxWidth: {
                "container": "108rem",
            },
            borderRadius: {
                lg: "1rem",
            },
            colors: {
                coal: "#0b0b0b",
            },
            gridTemplateColumns: {
                2: "repeat(2, auto)",
                3: "repeat(3, auto)",
                4: "repeat(4, auto)",
            },
            dasharray: {
                1: "1",
                2: "2",
                3: "3",
                4: "4",
                5: "5",
                10: "10",
                15: "15",
                20: "20",
                300: "300",
            },
            dashoffset: {
                1: "1",
                2: "2",
                3: "3",
                4: "4",
                5: "5",
                10: "10",
                15: "15",
                20: "20",
                300: "300",
            },
            animation: {
                lemniscate: "lemniscate 2s linear infinite",
            },
            keyframes: {
                lemniscate: {
                    "0%": { strokeDashoffset: "0" },
                    "100%": { strokeDashoffset: "256" },
                },
            },
        },
    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    dasharray: (value) => ({
                        strokeDasharray: value,
                    }),
                },
                { values: theme("dasharray") }
            );
        }),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    dashoffset: (value) => ({
                        strokeDashoffset: value,
                    }),
                },
                { values: theme("dashoffset") }
            );
        }),
        plugin(function ({ addVariant }) {
            addVariant("inview", "&.is-inview"); // here
        }),
    ],
};

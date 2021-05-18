module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        width: {
            900: "900px",
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("tailwindcss"), require("autoprefixer")],
};

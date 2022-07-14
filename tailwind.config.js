const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/**/*.css", "./src/**/*.html"],
    theme: {
        extend: {
            colors: {
                // Build your palette here
                sky: colors.sky,
                orange: colors.orange,
                cyan: colors.cyan,
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};

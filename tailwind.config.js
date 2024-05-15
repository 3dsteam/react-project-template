/** @type {import("tailwindcss").Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            textColor: {
                primary: "#3490dc",
            },
            backgroundColor: {
                primary: "#3490dc",
            },
        },
    },
    plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,mjs}'],
    theme: {
        screens: {
            xxs: { min: '380px' },
            xs: { min: '450px' },
            sm: { min: '640px' },
            md: { min: '768px' },
            lg: { min: '1024px' },
            xl: { min: '1280px' },
            '2xl': { min: '1536px' },
        },
        extend: {
            fontFamily: {
                Poppins: ['Poppins', 'sans-serif'],
            },
            colors: {
                primaryBlack: ['#2B2B2B'],
                primaryWhite: ['#F8F8F8'],
            },
        },
    },
    plugins: [],
};

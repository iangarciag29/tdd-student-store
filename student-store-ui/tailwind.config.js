/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/components/*/*.{js,jsx}',
        './src/icons/*/*.{js,jsx}',
        './src/pages/*.{js,jsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [require('flowbite/plugin')],
}

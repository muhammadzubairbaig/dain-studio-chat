/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'], // Defines the files Tailwind should scan for class names.
    darkMode: 'class', // Enables dark mode based on a class.
    theme: {
        fontFamily: {
            display: ['Oswald', 'sans-serif'], // Custom font for display text.
            body: ['Poppins', 'sans-serif'], // Custom font for body text.
        },
        container: {
            center: true, // Centers the container by default.
            padding: '1.5rem', // Adds padding to the container.
        },
        extend: {
            colors: {
                primary: '#113341', // Custom primary color.
                secondary: '#EA9B2A', // Custom secondary color.
                'scrollbar-bg': '#ffffff', // Background color for the scrollbar track
                'scrollbar-thumb': '#3182ce', // Default thumb color
                'scrollbar-thumb-hover': '#2b6cb0', // Hover thumb color
                'scrollbar-border': '#f1f1f1', // Thumb border color
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-out',
            },
            borderRadius: {
                'scrollbar': '10px',
            },
            borderWidth: {
                'scrollbar': '2px',
            },
            width: {
                'scrollbar': '8px',
            },
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'), // Enables aspect ratio utilities.
        require('@tailwindcss/forms'), // Provides better form styling.
        require('@tailwindcss/typography'), // Adds typography utilities.
        function ({ addUtilities }) {
            const newUtilities = {
                '.custom-scrollbar::-webkit-scrollbar': {
                    width: '8px',
                },
                '.custom-scrollbar::-webkit-scrollbar-track': {
                    background: 'white',
                },
                '.custom-scrollbar::-webkit-scrollbar-thumb': {
                    backgroundColor: '#3182ce',
                    borderRadius: '10px',
                    border: '2px solid #f1f1f1',
                },
                '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#2b6cb0',
                },
            };

            addUtilities(newUtilities, ['responsive', 'hover']);
        },
    ],
};

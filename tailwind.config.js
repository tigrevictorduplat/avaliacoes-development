/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./App/**/*.{js,jsx,ts,tsx}',
		'./screens/**/*.{js,jsx,ts,tsx}',
		'./Components/**/*.{js,jsx,ts,tsx}',
	],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			height: {
				icon: '50px',
			},
			width: {
				icon: '50px',
			},
			fontFamily: {
				poppins: ['poppins-regular'],
			},
			colors: {
				primaryGray: '#D9D9D9',
				primaryGreen: '#50B454',
			},
		},
	},
	plugins: [],
};

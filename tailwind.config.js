/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundColor: {
				cream: 'rgb(245 247 252)',
			},
			backgroundImage: {
				matrix: 'url(/images/matrix.gif)',
			},
		},
	},
	plugins: [],
}

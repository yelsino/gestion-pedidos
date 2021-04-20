module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"primario-green": "#B7FFC2",
				"primario-green-pure": "#025400",
				"primario-blue": "#0A82F0",
				"primario-red": "#FF2222",
				"primario-red-transparente": "#FFE0E0",
				"primario-gray": "#FCFCFC",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};

const { defineConfig } = require('cypress')

module.exports = defineConfig({
	projectId: 'hvy7hi',
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
})

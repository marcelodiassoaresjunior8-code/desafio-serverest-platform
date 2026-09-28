const { defineConfig } = require('cypress');
const { configureAllureAdapterPlugins } = require('@mmisty/cypress-allure-adapter/plugins');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://serverest.dev',
    video: false,
    setupNodeEvents(on, config) {
      configureAllureAdapterPlugins(on, config);
      return config;
    },
  },
});
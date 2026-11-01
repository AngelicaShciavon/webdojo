const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '17jhwz',

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

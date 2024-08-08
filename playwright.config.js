const { defineConfig } = require('@playwright/test');
const { AllureReporter } = require('allure-playwright');

module.exports = defineConfig({
    reporter: [
        ['list'],
        [AllureReporter, { outputFolder: 'allure-results' }]
    ],
});
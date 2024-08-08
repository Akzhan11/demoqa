const { test, expect } = require('@playwright/test');
const { FormPage } = require('../pages/FormPage');
const { allure } = require('allure-playwright');
const formData = require('../utils/formData.json');

test.describe('Automation Practice Form', () => {
    let formPage;

    test.beforeEach(async ({ page }) => {
        formPage = new FormPage(page);
        await page.goto('https://demoqa.com/automation-practice-form');
    });

    test('Should fill the form with valid data and submit', async ({ page }) => {
        const data = {
            firstName: 'Akzhan',
            lastName: 'Arystan',
            email: 'akzhanarystan@gmail.com',
            birthDate: '11 Dec 1995',
            mobile: '1234567890',
            subjects: 'Maths',
            picturePath: '/Users/akzhan/Desktop/demoqa/utils/test.png', // change this address to your local
            currentAddress: 'Almaty',
            state: 'Uttar Pradesh',
            city: 'Agra'
        };

        await formPage.fillForm(data);
        await formPage.checkSuccessMessage();
    });

    test('Should validate email and mobile number input fields', async ({ page }) => {
        const invalidData = {
            firstName: 'Akzhan',
            lastName: 'Arystan',
            email: formData.email,
            mobile: formData.mobile
        };

        const totalEmail = invalidData.email.length;
        for (let i = 0; i < totalEmail; i++) {
            await formPage.email.fill(invalidData.email[i]);
            await formPage.mobile.fill(invalidData.mobile[i]);

            await formPage.submitButton.click();

            await expect(formPage.email).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(formPage.mobile).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        }
    });

    test('Verify empty field validation for Name, Gender, and Mobile number input field', async ({ page }) => {
        await formPage.submitButton.click();
        await expect(formPage.firstName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(formPage.lastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator("label[for='gender-radio-1']")).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(page.locator("label[for='gender-radio-2']")).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(page.locator("label[for='gender-radio-3']")).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(formPage.mobile).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
});

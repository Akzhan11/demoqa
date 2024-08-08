const { expect } = require('@playwright/test');

class FormPage {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');
        this.email = page.locator('#userEmail');
        this.genderFemale = page.locator('label[for="gender-radio-2"]');
        this.mobile = page.locator('input[placeholder="Mobile Number"]');
        this.dateOfBirthInput = page.locator('#dateOfBirthInput');
        this.hobbiesCheckbox = page.locator('#hobbies-checkbox-1');
        this.subjectsInput = page.locator('input[id="subjectsInput"][type="text"]');
        this.uploadPicture = page.locator('#uploadPicture');
        this.currentAddress = page.locator('#currentAddress');
        this.stateDropdown = page.locator('#state');
        this.stateInput = page.locator('#react-select-3-input');
        this.cityDropdown = page.locator('#city');
        this.cityInput = page.locator('#react-select-4-input');
        this.submitButton = page.locator('#submit');
        this.successMessage = page.locator('#example-modal-sizes-title-lg');
    }

    async fillForm(data) {
        await this.firstName.fill(data.firstName);
        await this.lastName.fill(data.lastName);
        await this.email.fill(data.email);
        await this.genderFemale.click();
        await this.mobile.fill(data.mobile);
        await this.dateOfBirthInput.fill(data.birthDate);
        await this.page.keyboard.press('Enter');
        await this.hobbiesCheckbox.click({ force: true });
        await this.subjectsInput.fill(data.subjects);
        await this.page.waitForTimeout(500);
        await this.subjectsInput.press('Enter');
        await this.uploadPicture.setInputFiles(data.picturePath);
        await this.currentAddress.fill(data.currentAddress);
        await this.stateDropdown.click();
        await this.stateInput.fill(data.state);
        await this.page.keyboard.press('Tab');
        await this.cityDropdown.click();
        await this.cityInput.fill(data.city);
        await this.page.keyboard.press('Tab');
        await this.submitButton.click();
    }

    async checkSuccessMessage() {
        await expect(this.successMessage).toContainText("Thanks for submitting the form");
    }

    async checkValidationErrors() {
        await expect(this.email).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.mobile).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }
}

module.exports = { FormPage };

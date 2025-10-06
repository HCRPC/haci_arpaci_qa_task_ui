const { expect } = require('@playwright/test');
const testData = require("../tests/testdata/ui/testDataUi.json");

class UIVerifications {

    static async verifyUrl(page, expectedUrl) {
        await expect(page).toHaveURL(expectedUrl);
    }

    static async verifyUrlContains(newPage, expectedUrl) {
        await expect(newPage.url()).toContain(expectedUrl);
    }

    static async verifyElementVisible(element) {
        await expect(element).toBeVisible();
    }

    static async verifyTextContains(element, expectedText) {
        await expect(element).toContainText(expectedText);
    }

    static verifyCountGreaterThan(count, min) {
        expect(count).toBeGreaterThan(min);
    }

    static verifyJobListItems(jobs, expectedPosition, expectedDepartment, expectedLocation) {
        jobs.forEach(job => {
            expect(job.position).toContain(expectedPosition);
            expect(job.department).toContain(expectedDepartment);
            expect(job.location).toContain(expectedLocation);
        });
    }

    static async verifyPageTitle(page, expectedTitle) {
        await expect(page).toHaveTitle(expectedTitle);
    }
}

module.exports = UIVerifications;

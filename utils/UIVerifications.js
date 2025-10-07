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

    static verifyJobCountGreaterThan(count, min) {
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

    static async waitToListingsLoads(page,urlPath, ...queryParam) {
        await page.waitForResponse(async (res) => {
            const urlMatch = res.url().includes(urlPath);
            if (urlMatch && res.request().method() === 'GET' && (res.status() === 200|| res.status() === 304)) {
                try {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        const allLocs = data[0]?.categories?.allLocations;
                        const jobTitle = data[0]?.categories?.team;
                        return (
                            Array.isArray(allLocs) &&
                            allLocs.length > 0 &&
                            allLocs.every((loc) => loc === queryParam[0]) &&
                            jobTitle === queryParam[1]
                        );
                    }
                } catch (err) {
                    return false;
                }
            }
            return false;
        }, { timeout: 15000 });
    }
}

module.exports = UIVerifications;

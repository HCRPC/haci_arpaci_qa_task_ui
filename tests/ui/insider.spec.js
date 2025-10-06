const { test, expect } = require("@playwright/test");
const HomePage = require("../../pages/ui/HomePage");
const CareersPage = require("../../pages/ui/CareersPage");
const QualityAssurancePage = require("../../pages/ui/QualityAssurancePage");
const testData = require('../testdata/ui/testDataUi.json');
const UIHelper = require('../../utils/UIVerifications');


// Tests that start from the home page

test.describe("Insider Website Home Page Tests", () => {

  let homePage;
  let careersPage;
  let qualityAssurancePage;

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    homePage = new HomePage(page);
    careersPage = new CareersPage(page);
    qualityAssurancePage = new QualityAssurancePage(page);

    await homePage.navigate();
    await homePage.acceptCookies();

  });

  test("Verify Insider home page is opened", async ({ page }) => {

    //Check that Insider home page is opened
    await UIHelper.verifyUrl(page, testData.HOMEPAGE_URL);
    await UIHelper.verifyPageTitle(page, testData.HOMEPAGE_TITLE);
  });

  test("Verify Careers page sections are visible", async ({ page }) => {

    await homePage.hoverCompanyMenu();
    await homePage.clickCareers();
    await UIHelper.verifyUrl(page, testData.CAREERS_PAGE_URL);

    //Check Career page, its Locations, Teams, and Life at Insider blocks are open
    const areBlocksVisible = await careersPage.checkBlocksVisibility();
    expect(areBlocksVisible).toBeTruthy();

  });
});

// Tests that start directly from the QA page
test.describe("Insider Website QA Page Tests", () => {

  let qualityAssurancePage;

  test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      qualityAssurancePage = new QualityAssurancePage(page);
      await page.goto(testData.QA_PAGE_URL);
      await qualityAssurancePage.acceptCookies();
      await UIHelper.verifyUrl(page, testData.QA_PAGE_URL);

  });

  test("Filter QA jobs and Verify filtered jobs details", async ({ page }) => {

    await qualityAssurancePage.clickSeeAllQaJobs();
    await qualityAssurancePage.filterByLocation("Istanbul, Turkiye");
    await qualityAssurancePage.filterByDepartment("Quality Assurance");
    await page.waitForTimeout(5000);

    const jobListCount = await qualityAssurancePage.getJobListCount();

    // Check the presence of the job list
    UIHelper.verifyCountGreaterThan(jobListCount, 0)

    //Check that all jobs’ Position contains “Quality Assurance”, Department contains
    // “Quality Assurance”, and Location contains “Istanbul, Turkey”
    const jobs = await qualityAssurancePage.getJobDetails();
    await UIHelper.verifyJobListItems(jobs, "Quality Assurance", "Quality Assurance",
        "Istanbul, Turkiye");
    });


  test("Verify redirection to Lever Application form", async ({ page }) => {

    await qualityAssurancePage.clickSeeAllQaJobs();
    await qualityAssurancePage.filterByLocation("Istanbul, Turkiye");
    await qualityAssurancePage.filterByDepartment("Quality Assurance");

    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      // Click the first job's View Role button
      qualityAssurancePage.clickViewRole(0),
    ]);

    await newPage.waitForLoadState();
    //check that this action redirects us to the Lever Application form page
    await UIHelper.verifyUrlContains(newPage, testData.LEVER_APP_FORM_PAGE_URL);
  });
});

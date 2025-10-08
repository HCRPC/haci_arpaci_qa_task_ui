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
    await test.step("Verify Insider home page is opened", async () => {
      await UIHelper.verifyUrl(page, testData.HOMEPAGE_URL);
      await UIHelper.verifyPageTitle(page, testData.HOMEPAGE_TITLE);
    });
  });

  test("Verify Careers page sections are visible", async ({ page }) => {

    await homePage.hoverCompanyMenu();
    await homePage.clickCareers();
    await UIHelper.verifyUrlContains(page, testData.CAREERS_PAGE_URL);

    //Check Career page, its Locations, Teams, and Life at Insider blocks are open
    await test.step("Verify Career page widgets are loaded ", async () => {
      const areBlocksVisible = await careersPage.checkBlocksVisibility();
      expect(areBlocksVisible).toBeTruthy();
      });
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

    await test.step("Filter QA job and location", async () => {
      await qualityAssurancePage.filterByLocation(testData.QA_LOCATION);
      await qualityAssurancePage.filterByDepartment(testData.QA_DEPARTMENT);
    });
    await test.step("Wait for job listings to load", async () => {
      await UIHelper.waitToListingsLoads(page, testData.QA_JOB_URL, testData.QA_LOCATION, testData.QA_POSITION);
    });

    await test.step("Verify search job exists", async () => {
      const jobListCount = await qualityAssurancePage.getJobListCount();
      // Check the presence of the job list
      UIHelper.verifyJobCountGreaterThan(jobListCount, 0)
    });

    //Check that all jobs’ Position contains “Quality Assurance”, Department contains
    // “Quality Assurance”, and Location contains “Istanbul, Turkey”
    const jobs = await qualityAssurancePage.getJobDetails();
    await test.step("Verify filtered jobs details", async () => {
      await UIHelper.verifyJobListItems(jobs, testData.QA_POSITION, testData.QA_DEPARTMENT, testData.QA_LOCATION);
      });
    });


  test("Verify redirection to Lever Application form", async ({ page }) => {

    await qualityAssurancePage.clickSeeAllQaJobs();
    await test.step("Filter QA job and location", async () => {
      await qualityAssurancePage.filterByLocation(testData.QA_LOCATION);
      await qualityAssurancePage.filterByDepartment(testData.QA_DEPARTMENT);
      });

    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      // Click the first job's View Role button
      qualityAssurancePage.clickViewRole(0),
    ]);

    await newPage.waitForLoadState();
    //check that this action redirects us to the Lever Application form page
    await test.step("Verify redirection to Lever Application form", async () => {
      await UIHelper.verifyUrlContains(newPage, testData.LEVER_APP_FORM_PAGE_URL);
    });
  });
});

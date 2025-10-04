const { test, expect } = require("@playwright/test");
const HomePage = require("../pages/HomePage");
const CareersPage = require("../pages/CareersPage");
const QualityAssurancePage = require("../pages/QualityAssurancePage");
const testData = require('./testData.json');


// Tests that start from the home page

test.describe("Insider Website Home Page Tests", () => {

  let homePage;
  let careersPage;
  let qualityAssurancePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    careersPage = new CareersPage(page);
    qualityAssurancePage = new QualityAssurancePage(page);

    await homePage.navigate();
    await expect(page).toHaveURL(testData.HOMEPAGE_URL);
    await homePage.acceptCookies();

  });

  test("Verify Insider home page is opened", async ({ page }) => {

    //Check that Insider home page is opened
    await expect(page).toHaveURL(testData.HOMEPAGE_URL);

  });

  test("Verify Careers page sections are visible", async ({ page }) => {

    await homePage.hoverCompanyMenu();
    await homePage.clickCareers();
    await expect(page).toHaveURL(testData.CAREERS_PAGE_URL);

    //Check Career page, its Locations, Teams, and Life at Insider blocks are open
    const areBlocksVisible = await careersPage.checkBlocksVisibility();
    expect(areBlocksVisible).toBeTruthy();

  });
});

// Tests that start directly from the QA page

test.describe("Insider Website QA Page Tests", () => {

  let qualityAssurancePage;

  test.beforeEach(async ({ page }) => {

      qualityAssurancePage = new QualityAssurancePage(page);
      await page.goto(testData.QA_PAGE_URL);
      await qualityAssurancePage.acceptCookies();
      await expect(page).toHaveURL(testData.QA_PAGE_URL);

  });

  test("Filter QA jobs and Verify filtered jobs details", async ({ page }) => {

    await qualityAssurancePage.clickSeeAllQaJobs();
    await qualityAssurancePage.filterByLocation("Istanbul, Turkiye");
    await qualityAssurancePage.filterByDepartment("Quality Assurance");
    await page.waitForTimeout(5000);

    const jobListCount = await qualityAssurancePage.getJobListCount();

    // Check the presence of the job list
    expect(jobListCount).toBeGreaterThan(0);

      //Check that all jobs’ Position contains “Quality Assurance”, Department contains
    // “Quality Assurance”, and Location contains “Istanbul, Turkey”
    const jobs = await qualityAssurancePage.getJobDetails();


      jobs.forEach(job => {
          expect(job.position).toContain("Quality Assurance");
          expect(job.department).toContain("Quality Assurance");
          expect(job.location).toContain("Istanbul, Turkiye");
      });
    //await qualityAssurancePage.assertFilteredJobsAreRelated(jobs);

    });


  test("Verify redirection to Lever Application form", async ({ page }) => {


    await qualityAssurancePage.clickSeeAllQaJobs();
    await qualityAssurancePage.filterByLocation("Istanbul, Turkiye");
    await qualityAssurancePage.filterByDepartment("Quality Assurance");

    const jobListCount = await qualityAssurancePage.getJobListCount();

    // Check the presence of the job list
    expect(jobListCount).toBeGreaterThan(0);

    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      // Click the first job's View Role button
      qualityAssurancePage.clickViewRole(0),
    ]);

    await newPage.waitForLoadState();
    //check that this action redirects us to the Lever Application form page
    expect(newPage.url()).toContain(testData.LEVER_APP_FORM_PAGE_URL);

  });
});

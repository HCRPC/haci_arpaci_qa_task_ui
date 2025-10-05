const BasePage = require('./BasePage');

class QualityAssurancePage extends BasePage {
  constructor(page) {
    super(page);
    this.seeAllQajobsButton = page.getByRole('link', { name: 'See all QA jobs'});
    this.locationFilter = page.locator("#filter-by-location");
    this.departmentFilter = page.locator("#filter-by-department");
    this.jobList = page.locator("section[id=\"career-position-list\"] div.position-list-item-wrapper.bg-light");
    this.jobPosition = (jobItem) => jobItem.locator(" span");
    this.jobDepartment = (jobItem) => jobItem.locator(" p");
    this.jobLocation = (jobItem) => jobItem.locator(" div");
    this.viewRoleButton = (jobItem) => jobItem.locator("a:has-text(\"View Role\")");
  }

  async clickSeeAllQaJobs() {
    await this.seeAllQajobsButton.click();
  }

  async filterByLocation(location) {
    await this.locationFilter.selectOption({ label: location });
  }

  async filterByDepartment(department) {
    await this.departmentFilter.selectOption({ label: department });
  }

  async getJobListCount() {
    return await this.jobList.count();
  }

  async getJobDetails() {
    const jobs = [];
    const jobCount = await this.getJobListCount();
    for (let i = 0; i < jobCount; i++) {
      const jobItem = this.jobList.nth(i);
      const position = await this.jobPosition(jobItem).textContent();
      const department = await this.jobDepartment(jobItem).textContent();
      const location = await this.jobLocation(jobItem).textContent();
      jobs.push({ position, department, location });
    }
    return jobs;
  }

  async clickViewRole(index) {
    const jobItem = this.jobList.nth(index);
    await this.viewRoleButton(jobItem).click();
  }
}

module.exports = QualityAssurancePage;

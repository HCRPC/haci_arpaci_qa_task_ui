class CareersPage {
  constructor(page) {
    this.page = page;
    this.locationsBlock = page.locator("section#career-our-location");
    this.teamsBlock = page.locator("section#career-find-our-calling");
    this.lifeAtInsiderBlock = page.locator(".elementor-widget-container").filter({ hasText: "Life at Insider" });
    this.qaJobsLink = page.locator("a[href=\"/careers/quality-assurance/\"]");
  }

  async checkBlocksVisibility() {
    await this.locationsBlock.scrollIntoViewIfNeeded();
    await this.teamsBlock.scrollIntoViewIfNeeded();
    await this.lifeAtInsiderBlock.scrollIntoViewIfNeeded();
    return (
      (await this.locationsBlock.isVisible()) &&
      (await this.teamsBlock.isVisible()) &&
      (await this.lifeAtInsiderBlock.isVisible())
    );
  }

  async clickQAJobs() {
    await this.qaJobsLink.click();
  }
}

module.exports = CareersPage;

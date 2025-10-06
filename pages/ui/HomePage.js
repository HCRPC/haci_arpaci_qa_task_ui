const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.companyMenu = page.getByRole('link', { name: 'Company'});
    this.careersLink = page.getByRole('link', { name: 'Careers'});
  }

  async navigate() {
    await this.page.goto("https://useinsider.com/");
  }

  async hoverCompanyMenu() {
    await this.companyMenu.hover();
  }

  async clickCareers() {
    await this.careersLink.click();
  }
}

module.exports = HomePage;

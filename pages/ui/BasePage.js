class BasePage {
  constructor(page) {
    this.page = page;
    this.acceptCookiesButton = page.locator("#wt-cli-accept-all-btn");
  }

  async acceptCookies() {
    if (await this.acceptCookiesButton.isVisible()) {
      await this.acceptCookiesButton.click();
    }
  }
}

module.exports = BasePage;

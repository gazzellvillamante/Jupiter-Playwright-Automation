export class ScreenshotHelper {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */
  constructor(page, testInfo) {
    this.page = page;
    this.testInfo = testInfo;
  }

  /**
   * Captures a screenshot and attaches it directly to the HTML report
   * @param {string} name - Title displayed in the HTML report
   */
  async attach(name) {
    const screenshot = await this.page.screenshot();
    await this.testInfo.attach(name, {
      body: screenshot,
      contentType: 'image/png',
    });
  }
}
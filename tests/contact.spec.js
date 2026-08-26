import { test, expect } from '../fixtures/pageManager.fixture.js';
import { generateContactData } from '../utils/testData.js';

const SUBMISSION_RUNS = 5;

test.describe('Contact form', { tag: '@regression' }, () => {
  test('TC001 - Validation errors on mandatory fields are cleared after values are populated', async ({
    pageManager,
  }) => {
    const homePage = pageManager.getHomePage();
    const contactPage = pageManager.getContactPage();
    const screenshot = pageManager.getScreenshot();
    const testData = generateContactData();

    await test.step('Navigate to the contact page and submit it empty', async () => {
      await homePage.goToContact();
      await contactPage.clickSubmit();
    });

    await test.step('Validate the header and field-level error messages', async () => {
      await expect(
        contactPage.headerError,
        'Header error should display expected validation instruction'
      ).toContainText("but we won't get it unless you complete the form correctly.");

      await expect(
        contactPage.forenameError,
        'Forename field error should display "Forename is required"'
      ).toHaveText('Forename is required');

      await expect(
        contactPage.emailError,
        'Email field error should display "Email is required"'
      ).toHaveText('Email is required');

      await expect(
        contactPage.messageError,
        'Message field error should display "Message is required"'
      ).toHaveText('Message is required');

      await screenshot.attach('Mandatory Field Errors Displayed');
    });

    await test.step('Populate the mandatory fields and resubmit', async () => {
      await contactPage.populateMandatoryFields(testData.forename, testData.email, testData.message);
      await contactPage.clickSubmit();
    });

    await test.step('Validate all errors are cleared', async () => {
      await expect(contactPage.headerError, 'Header error should be hidden after filling form').toBeHidden();
      await expect(contactPage.forenameError, 'Forename error should be hidden').toBeHidden();
      await expect(contactPage.emailError, 'Email error should be hidden').toBeHidden();
      await expect(contactPage.messageError, 'Message error should be hidden').toBeHidden();

      await screenshot.attach('Mandatory Field Errors Cleared');
    });
  });

  for (let i = 1; i <= SUBMISSION_RUNS; i++) {
    test(`TC002 - Execution ${i} of ${SUBMISSION_RUNS}: successful submission workflow`, async ({ pageManager }) => {
      const homePage = pageManager.getHomePage();
      const contactPage = pageManager.getContactPage();
      const screenshot = pageManager.getScreenshot();
      const { forename, email, message } = generateContactData();

      await test.step('Navigate to the contact page', async () => {
        await homePage.goToContact();
      });

      await test.step('Populate the form and submit', async () => {
        await contactPage.populateMandatoryFields(forename, email, message);
        await contactPage.clickSubmit();
        await contactPage.waitForSubmissionToComplete();
      });

      await test.step('Validate the success confirmation message', async () => {
        await expect(
          contactPage.confirmMessage,
          'Success alert should display appreciation message'
        ).toContainText(`Thanks ${forename}, we appreciate your feedback.`);

        await screenshot.attach('Successful Submission Confirmation');
      });
    });
  }
});

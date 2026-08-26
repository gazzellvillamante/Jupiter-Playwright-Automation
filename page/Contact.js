export class Contact {
    constructor(page, testInfo) {
        this.page = page;

        // Base form locators
        this.submit = page.getByText('Submit');
        this.headerError = page.locator('.alert-error');
        this.forename = page.getByLabel('Forename');
        this.email = page.getByLabel('Email');
        this.message = page.getByLabel('Message');

        // Field level error locators
        this.forenameError = this.forename.locator('+ .help-inline');
        this.emailError = this.email.locator('+ .help-inline');
        this.messageError = this.message.locator('+ .help-inline');

        this.confirmMessage = page.locator('.alert-success');
        this.pageLoader = page.locator('.progress-info');  

    }

    async clickSubmit() {
        await this.submit.click();

    }

    async populateMandatoryFields(forename, email, message) {

        await this.forename.fill(forename);
        await this.email.fill(email);
        await this.message.fill(message);

    }

    async waitForSubmissionToComplete() {
        await this.pageLoader.waitFor({ state: 'hidden', timeout: 30000 });
    }


    
}


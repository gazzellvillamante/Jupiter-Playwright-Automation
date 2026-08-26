## Overview 
An end to end automation framework for http://jupiter.cloud.planittesting.com that is built using Playwright + Javascript and follows the Page Object Model. By default, the automation suite executes test cases across 3 different browsers (Chrome, Firefox, Webkit). To execute a specific test file or on a specific browser, kindly refer to Test Execution instruction below.

Since Playwright has official Docker containers, it can seamlessly integrate with GitHub Actions for continuous integration. Kindly navigate to the Actions tab in this repository to monitor real-time test runs, review execution history, and download Playwright HTML reports.


## Installation

1. Install dependencies (this also installs Playwright and Faker, listed in `devDependencies`)
```
npm install
```

2. Install Playwright 
```
npx playwright install
```

3. Install Faker to use it's library in generating realistic mock data ie names, email, message etc.
```
npm install @faker-js/faker --save-dev
```

## Test Execution
1. To run in headless mode, use command:
```
npx playwright test
```

2. To run using playwright UI, use command:
```
npx playwright test --ui 
```

3. To run a specific test, use command:
```
npx playwright test tests/contact.spec.js   # Run contact test
npx playwright test tests/shop.spec.js      # Run shop test
```

4. To run in headed mode using a specific browser, use command:
```
npx playwright test --project=chromium --headed     # Using Chrome Browser
npx playwright test --project=firefox --headed      # Using Firefox Browser
npx playwright test --project=webkit --headed       # Using Safari Browser
```
Shortcuts `npm run test:chromium`, `npm run test:firefox`, `npm run test:webkit` are also available (headless).

5. Point the suite at a different environment without editing config:
```
BASE_URL="https://staging.example.com/#/" npx playwright test
```

## Test Execution Report and Screenshots
An execution report can be opened after running the tests which is in a form of HTML. It can be accessed by using this command:
```
npx playwright show-report
```

## Framework Features

- **Page Object Model (POM)**: each page has its own class storing locators and reusable action methods. `/page` contains `Cart`, `Contact`, `Home`, `Shop`.
- **PageManager**: centralises page object (and `ScreenshotHelper`) construction so a test never instantiates a page object directly.
- **`pageManager` fixture** (`/fixtures/pageManager.fixture.js`): extends the base Playwright `test` so every spec receives a fully wired `pageManager` with zero setup boilerplate. Import `test`/`expect` from this file instead of `@playwright/test` in spec files.
- **Screenshot logging**: `ScreenshotHelper`, obtained via `pageManager.getScreenshot()`, attaches screenshots to the HTML report at key assertion points for visual evidence.
- **Dynamic Data Generation**: `utils/testData.js` wraps the Faker library to generate realistic, isolated mock data (with the option to override individual fields) for the Contact form; `data/products.js` holds the shop catalogue data used to drive the cart test.
- **`test.step`**: each spec's actions are broken into named steps for clearer traces and HTML report output.
- **Tags**: specs are tagged `@regression` (via `test.describe(title, { tag }, ...)`) so subsets can be filtered with `--grep`.
- **Environment-aware config**: `baseURL` can be overridden with a `BASE_URL` environment variable without touching `playwright.config.js`.
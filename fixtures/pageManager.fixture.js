import { test as base } from '@playwright/test';
import { PageManager } from '../page/PageManager.js';

/**
 * Extends the base Playwright test with a ready-to-use `pageManager` fixture.
 *
 * Import `test`/`expect` from this file instead of '@playwright/test' in spec
 * files. 
 *
 * Usage:
 *   import { test, expect } from '../fixtures/pageManager.fixture.js';
 *
 *   test('example', async ({ pageManager }) => {
 *     const homePage = pageManager.getHomePage();
 *     ...
 *   });
 */

export const test = base.extend({
  pageManager: async ({ page }, use, testInfo) => {
    const pageManager = new PageManager(page, testInfo);
    await use(pageManager);
  },
});

export { expect } from '@playwright/test';
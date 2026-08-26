import { Contact } from './Contact.js';
import { Home } from './Home.js';
import { Shop } from './Shop.js';
import { Cart } from './Cart.js';
import { ScreenshotHelper } from '../utils/ScreenshotHelper.js';

/**
 * Centralises page object + helper creation so tests never construct
 * page objects (or the ScreenshotHelper) directly. One PageManager per
 * test, normally obtained via the `pageManager` fixture
 */

export class PageManager{
    constructor(page, testInfo){
        this.page = page;
        this.testInfo = testInfo;

        this.contactPage = new Contact(page);
        this.homePage = new Home(page);
        this.shopPage = new Shop(page);
        this.cartPage = new Cart(page);
        this.screenshot = new ScreenshotHelper(page, testInfo);

    }

    getContactPage() {
    return this.contactPage;
  }

    getHomePage() {
        return this.homePage;
    }

    getShopPage() {
        return this.shopPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getScreenshot() {
        return this.screenshot;
    }
}


import { test, expect } from '../fixtures/pageManager.fixture.js';
import { itemsToPurchase } from '../data/products.js';

test.describe('Shop cart flow', { tag: '@regression' }, () => {
  test('TC003 - Add items to the cart and verify its price, subtotal and total', async ({ pageManager }) => {
    const homePage = pageManager.getHomePage();
    const shopPage = pageManager.getShopPage();
    const cartPage = pageManager.getCartPage();
    const screenshot = pageManager.getScreenshot();

    const expectedCartData = [];

    await test.step('Add each item to the cart, capturing its shop price', async () => {
      await homePage.goToShop();

      for (const item of itemsToPurchase) {
        const unitPrice = await shopPage.getProductPrice(item.name);
        await shopPage.buyProduct(item.name, item.qty);

        expectedCartData.push({
          name: item.name,
          qty: item.qty,
          unitPrice,
          expectedSubtotal: unitPrice * item.qty,
        });
      }
    });

    await homePage.goToCart();

    let calculatedCartTotal = 0;

    await test.step('Verify the unit price and subtotal for each cart item', async () => {
      for (const item of expectedCartData) {
        const cartUnitPrice = await cartPage.getItemUnitPrice(item.name);
        const cartSubtotal = await cartPage.getItemSubtotal(item.name);

        expect(cartUnitPrice, `Unit price in cart for "${item.name}" should match shop price`).toBe(item.unitPrice);

        expect(
          cartSubtotal,
          `Subtotal for "${item.name}" should equal unit price ($${item.unitPrice}) x quantity (${item.qty})`
        ).toBe(item.expectedSubtotal);

        calculatedCartTotal += cartSubtotal;
      }

      await screenshot.attach('Cart Subtotals Verified');
    });

    await test.step('Verify the cart total sum', async () => {
      const actualCartTotal = await cartPage.getCartTotal();

      expect(actualCartTotal, 'Cart total should equal the sum of all item subtotals').toBe(calculatedCartTotal);

      await screenshot.attach('Cart Total Verified');
    });
  });
});

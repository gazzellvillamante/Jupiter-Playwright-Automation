export class Cart{
    constructor(page){
        this.page = page;
        this.row = page.locator('.cart-item');
        this.total = page.locator('.total');
    }

    // Get cart row for a specific item name
    getCartRow(productName) {
        return this.row.filter({ hasText: productName });
    }

    // Get unit price displayed in the cart row
    async getItemUnitPrice(productName) {
        const row = this.getCartRow(productName);
        const priceText = await row.locator('td').nth(1).textContent();
        return parseFloat(priceText.replace('$', '').trim());
    }

    // Get subtotal displayed in the cart row
    async getItemSubtotal(productName) {
        const row = this.getCartRow(productName);
        const subtotalText = await row.locator('td').nth(3).textContent();
        return parseFloat(subtotalText.replace('$', '').trim());
    }

    // Get displayed cart total amount
    async getCartTotal() {
        const text = await this.total.textContent();
        const cleanText = text.replace('Total:', '').replace('$', '').trim();
        return parseFloat(cleanText);
    }
}


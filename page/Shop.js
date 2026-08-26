export class Shop{
    constructor(page){
        this.page = page;
        this.products = page.locator('.product');

    }

    // Get product card container by name
    getProductCard(productName) {
        return this.products.filter({ hasText: productName });
    }

    // Get displayed unit price from shop page
    async getProductPrice(productName) {
        const productCard = this.getProductCard(productName);
        const priceText = await productCard.locator('.product-price').textContent();
        return parseFloat(priceText.replace('$', '').trim());
    }

    // Buy a specific product a given number of times
    async buyProduct(productName, quantity) {
        const productCard = this.getProductCard(productName);
        const buyButton = productCard.getByText('Buy');
        
        for (let i = 0; i < quantity; i++) {
            await buyButton.click();
        }
    }
}


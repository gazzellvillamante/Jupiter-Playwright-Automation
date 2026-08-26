export class Home{
    constructor(page){
        this.page = page;
        this.contactLink = page.getByRole('link', {name:'Contact', exact: true });

        // Ensure we are clicking the first instance of the Shop link, as there are two on the page
        this.shopLink = page.getByRole('link', { name: 'Shop', exact: true }).first();
        
        // Use a regex to match the Cart link since it renders "Cart (n)"
        this.cartLink = page.getByRole('link', { name: /Cart/ });

    }

    async goToContact() {
        await this.navigateHome();
        await this.contactLink.click();
  }

    async goToShop() {
        await this.navigateHome();
        await this.shopLink.click();
    }


    async navigateHome() {
        await this.page.goto('/');
        await this.page.waitForLoadState('networkidle');
        // Belt-and-braces: confirm the nav itself is actually interactive
        // before returning control to the caller.
        await this.contactLink.waitFor({ state: 'visible' });
   }

    async goToCart(){
        await this.cartLink.click();
    }
}


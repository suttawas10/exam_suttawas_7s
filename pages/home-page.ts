import { Locator, Page } from "@playwright/test";

export class HomePage{

    readonly page : Page
    readonly nokCashBannerLocator: Locator ;
    readonly acceptCookieLocator: Locator ;
    readonly loginModalLocator: Locator ;
    readonly loginButtonLocator: Locator ;

    constructor(page : Page){
        this.page = page ;
        this.nokCashBannerLocator = this.page.locator('data-testid=nok-cash-banner');
        this.acceptCookieLocator = this.page.locator('data-testid=button >> text=ยอมรับทั้งหมด');
        this.loginModalLocator = this.page.locator('data-testid=global-modal');
        this.loginButtonLocator = this.page.locator('data-testid=option-modal-confirm-button');
    }

    async nokCashTopUp() {
        await Promise.all ([
             this.page.waitForNavigation(),
             this.nokCashBannerLocator.click()
        ]);        
    }

    async acceptCookie() {
        await Promise.all ([
             this.acceptCookieLocator.waitFor({ state: 'hidden' }),
             this.acceptCookieLocator.click()
        ]);        
    }

    async goToLogIn() {
        this.nokCashBannerLocator.click()
        this.loginModalLocator.waitFor(),
        await Promise.all ([
            this.page.waitForNavigation(),
             this.loginButtonLocator.click()
        ]);        
    }
}
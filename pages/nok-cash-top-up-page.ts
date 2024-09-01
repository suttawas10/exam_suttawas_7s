import { Locator, Page ,expect} from "@playwright/test";

export class NokCashTopUpPage{

    readonly page : Page
    readonly nokCashCardLocator: Locator ;
    readonly nokCashAmountInputLocator: Locator ;
    readonly nokCashTopUpSubmitLocator: Locator ;
    readonly nokCashCancelTopUpLocator: Locator ;
    readonly addFixedAmount105Locator: Locator ;
    readonly addFixedAmountLocator: String ;
    
    constructor(page : Page){
        this.page = page ;
        this.nokCashCardLocator = this.page.locator('data-testid=nok-cash-card');
        this.nokCashAmountInputLocator = this.page.locator('data-testid=nok-cash-amount-input');
        this.nokCashTopUpSubmitLocator = this.page.locator('data-testid=nok-cash-top-up-button');
        this.nokCashCancelTopUpLocator = this.page.locator('data-testid=nok-cash-cancel-button');
        this.addFixedAmountLocator = 'data-testid=add-${amount}-bath';
    }

    async inputAmountCash(amount:number) {
        await this.nokCashAmountInputLocator.fill(`${amount}`)
        await expect(this.nokCashAmountInputLocator).toHaveValue(`${amount}`)
    }

    async addFixedAmountCash(amount:number) {
        const buttonAmountlocator = await this.page.locator(this.addFixedAmountLocator.replace('${amount}', `${amount}`));
        await buttonAmountlocator.click()
        await expect(this.nokCashAmountInputLocator).toHaveValue(`${amount}`)
    }
    
    async submitTopUp() {
        await Promise.all ([
            this.page.waitForNavigation(),
            this.nokCashTopUpSubmitLocator.click()
       ]);
    }

    async cancelTopUp() {
        await Promise.all ([
            this.page.waitForNavigation(),
            this.nokCashCancelTopUpLocator.click()
       ]);
       await expect(this.nokCashCardLocator).toBeHidden()
    }
}
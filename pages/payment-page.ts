import { Locator, Page, expect } from "@playwright/test";

export class PaymentPage{

    readonly page : Page
    readonly nokCashAmountLocator: Locator ;
    readonly subTotalLocator: Locator ;
    readonly totalPriceLocator: Locator ;
    readonly totalPriceAlertLocator: Locator ;

    constructor(page : Page){
        this.page = page ;
        this.nokCashAmountLocator = this.page.locator('data-testid=nokcash-amount');
        this.subTotalLocator = this.page.locator('data-testid=sub-total');
        this.totalPriceLocator = this.page.locator('data-testid=total-price');
        this.totalPriceAlertLocator = this.page.locator('data-testid=total-price-alert');
    }
    
    async verifyPaymentDetail(amount:number) {
        await expect(this.nokCashAmountLocator).toHaveText(`${amount}`)
        await expect(this.subTotalLocator).toHaveText(`${amount}.00`)
        await expect(this.totalPriceLocator).toHaveText(`${amount}.00`)    
        await expect(this.totalPriceAlertLocator).toHaveText(`${amount}.00`)        
    }
}
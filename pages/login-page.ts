import { Locator, Page } from "@playwright/test";

export class LoginPage{

    readonly page : Page
    readonly emailInputLocator: Locator ;
    readonly passwordInputLocator: Locator ;
    readonly loginBtnLocator: Locator ;


    constructor(page : Page){
        this.page = page ;
        this.emailInputLocator = this.page.locator('css=input[name="tid"]');
        this.passwordInputLocator = this.page.locator('css=input[name="tpasswd"]');
        this.loginBtnLocator = this.page.locator('css=button[type="submit"]');

    }

    async login(email:string , password: string) {
        await this.emailInputLocator.fill(email);
        await this.passwordInputLocator.fill(password);
        await Promise.all ([
             this.page.waitForNavigation(),
             this.loginBtnLocator.click()
        ]);
        
    }

}
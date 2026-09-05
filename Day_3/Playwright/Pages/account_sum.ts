import { Page , Locator  } from "@playwright/test";


export class AccountSummaryPage {
   // locators 
    readonly page: Page;
    readonly accountSummaryLink: Locator;
    readonly accountSummaryHead: Locator;
    readonly checkingAccount: Locator;
    readonly savingAccount: Locator;
    readonly totalBalance: Locator;
     constructor(page : Page) {
        this.page= page;
        this.accountSummaryLink=  page.getByRole('button', { name: 'Accounts Summary' });
        this.accountSummaryHead= page.getByRole('heading', { name: 'Accounts Summary' });
        this.checkingAccount=  page.locator('span:has-text("CHECKING ACCOUNT")');
        this.savingAccount=  page.locator('span:has-text("SAVINGS ACCOUNT")');
        this.totalBalance= page.locator('span:has-text("TOTAL NET WORTH")');
     }
    // page actions 
    async openAccountSummary(){
        await this.accountSummaryLink.click();
    }
    async getCheckingAccount(){
        return await this.checkingAccount.textContent();
    }
    async getSavingAccount(){
        return await this.savingAccount.textContent();
    }
    async getTotalAccount(){
        return await this.totalBalance.textContent();
    }

}
import { Page, Locator, expect } from "@playwright/test";

export class TransactionPage {

    readonly page: Page;

    // Locators
    readonly transactionHistory: Locator;
    readonly transactionRows: Locator;

    constructor(page: Page) {

        this.page = page;

        this.transactionHistory = page.getByRole('button', { name: 'Accounts Summary' })

        this.transactionRows = page.locator('tbody').locator('tr');
    }

    // Actions

    async openTransactionHistory() {

        await this.transactionHistory.click();

        await expect(this.transactionRows.first()).toBeVisible();
    }

    async verifyTransaction(
        beneficiary: string,
        amount: string
    ) {

        const transaction =
            this.transactionRows.filter({
                hasText: beneficiary
            });

        await expect(
            transaction.first()
        ).toContainText(amount);
    }

}
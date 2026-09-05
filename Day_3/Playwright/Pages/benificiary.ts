import { Page, Locator, expect } from "@playwright/test";

export class BeneficiaryPage {

    readonly page: Page;

    // Locators
    readonly transfersButton: Locator;
    //readonly manageBeneficiaries: Locator;
    readonly addBeneficiaryButton: Locator;
    readonly beneficiaryName: Locator;
    readonly beneficiaryAccount: Locator;
    readonly beneficiaryBank: Locator;
    readonly saveBeneficiaryButton: Locator;

    constructor(page: Page) {

        this.page = page;

        // this.transfersButton =
        //     page.getByText("Transfers", {
        //         exact: true
        //     });

        this.transfersButton =  page.getByRole('button', { name: 'Funds Transfer' })

        // this.manageBeneficiaries =
        //     page.getByText(
        //         "Manage Beneficiaries",
        //         {
        //             exact: true
        //         }
        //     );

        this.addBeneficiaryButton =  page.getByRole('button', { name: 'Add New' })

        this.beneficiaryName =
            page.locator("#bene-name");

        this.beneficiaryAccount =
            page.locator("#bene-account");

        this.beneficiaryBank =
            page.locator("#bene-bank");

        this.saveBeneficiaryButton =
            page.getByRole("button", {
                name: /save beneficiary/i
            });
    }

    // Actions

    async openBeneficiaryPage() {

        await this.transfersButton.click();

        //await this.manageBeneficiaries.click();
    }

    async createBeneficiary(
        name: string,
        accountNumber: string,
        bank: string
    ) {

        await this.addBeneficiaryButton.click();

        await this.beneficiaryName.fill(name);

        await this.beneficiaryAccount.fill(
            accountNumber
        );

        await this.beneficiaryBank.selectOption({
            label: bank
        });

        await this.saveBeneficiaryButton.click();

        await expect(
            this.page.getByText(name)
        ).toBeVisible();
    }
}
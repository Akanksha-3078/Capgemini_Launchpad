import { Page, Locator, expect } from "@playwright/test";

export class TransferPage {

    readonly page: Page;

    // Locators
    //readonly transfersButton: Locator;
    readonly transferType: Locator;
    readonly beneficiary: Locator;
    readonly transferAmount: Locator;
    readonly initiateWireButton: Locator;

    readonly otpDialog: Locator;
    readonly otpInput: Locator;
    readonly submitOtpButton: Locator;

    constructor(page: Page) {

        this.page = page;

        //this.transfersButton = page.getByText("Transfers", {exact: true });

        this.transferType = page.locator('#transfer-type');

        this.beneficiary = page.locator('#bene-select')
           

        this.transferAmount = page.getByRole('spinbutton', { name: '0.00' })
            

        this.initiateWireButton = page.getByRole('button', { name: 'Initiate Wire' })
           

        this.otpDialog = page.locator('div.otp-dialog.card-complex')

        this.otpInput = page.getByRole('textbox', { name: 'Enter 6-digit OTP' })

        this.submitOtpButton = page.getByRole('button', { name: 'Verify' })
    }

    // Actions

    // async openTransferPage() {

    //     await this.transfersButton.click();
    // }

    async transferFunds(
        beneficiaryName: string,
        amount: string
    ) {

        await this.transferType.selectOption({ label: 'External Wire Transfer' });

        await this.beneficiary.selectOption({label: 'John Doe (Chase Bank)'});

        await this.transferAmount.fill(amount);

        await this.initiateWireButton.click();

        await expect(this.otpDialog).toBeVisible();

        

        // Get OTP displayed by sandbox
        // const otpText = await this.otpDialog.innerText();

        // const otpMatch = otpText.match(/\b\d{6}\b/);

        // if (!otpMatch) {
        //     throw new Error(
        //         "OTP not found"
        //     );
        // }

        // const otp = otpMatch[0];

        // const inputCount =
        //     await this.otpInput.count();

        // if (inputCount === 1) {

        //     await this.otpInput.fill(otp);

        // } else {

        //     for (let i = 0; i < otp.length; i++) {

        //         await this.otpInput
        //             .nth(i)
        //             .fill(otp[i]);
        //     }
        // }

        // await this.submitOtpButton.click();
    }

    async verifyOtp() {
        const otpMessage = this.page.getByText(/\[SIMULATED SMS OTP\]/);
        const otp = (await otpMessage.textContent())?.match(/\b\d{6}\b/)?.[0];
        expect(otp).toBeTruthy();
        await this.page.getByRole('textbox', { name: 'Enter 6-digit OTP' }).fill(otp!);
        await this.page.getByRole('button', { name: 'Verify' }).click();
    }

    async expectTransactionStatus(status: string) {
        const confirmation = status.toLowerCase() === 'successful'
            ? /Wire transfer of .* complete\./i
            : new RegExp(status, 'i');
        await expect(this.page.getByText(confirmation)).toBeVisible();
    }
}
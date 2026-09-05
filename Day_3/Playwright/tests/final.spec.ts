import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { AccountSummaryPage } from "../pages/account_sum";
import { BeneficiaryPage } from "../pages/benificiary";
import { TransferPage } from "../pages/transfer";
import { TransactionPage } from "../pages/transaction";
import { LogoutPage } from "../pages/logout";
import testData from "../test-data/bankingData.json";


test.describe("Banking Application - Fund Transfer",() => {
    test(
        "Login → Create Beneficiary → Transfer Funds → Validate History → Verify Balance → Logout",async ({ page }) => {
       
        // CREATE PAGE OBJECTS
       
        const loginPage = new LoginPage(page);
        const accountSummaryPage = new AccountSummaryPage(page);
        const beneficiaryPage = new BeneficiaryPage(page);
        const transferPage = new TransferPage(page);
        const transactionPage = new TransactionPage(page);
        const logoutPage = new LogoutPage(page);


        // 1. LOGIN

        await test.step("Login to banking application", async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.login( testData.login.username,testData.login.password);
            }
        );


        // 2. ACCOUNT SUMMARY

        let initialBalance = 0;

        await test.step( "Get initial account balance",async () => {

                await accountSummaryPage.openAccountSummary();

                const checkingAccount = await accountSummaryPage.getCheckingAccount();

                console.log("Checking Account:",checkingAccount);

                const totalBalance = await accountSummaryPage.getTotalAccount();

                console.log("Total Balance:",totalBalance);

                const balanceMatch =totalBalance?.match( /\$[\d,]+(?:\.\d{2})?/);

                if (balanceMatch) {

                    initialBalance =
                        parseFloat(
                            balanceMatch[0]
                                .replace("$", "")
                                .replace(",", "")
                        );
                }
            }
        );



        // 3. CREATE BENEFICIARY

        await test.step(
            "Create beneficiary",
            async () => {

                await beneficiaryPage.openBeneficiaryPage();

                await beneficiaryPage.createBeneficiary(testData.beneficiary.name,testData.beneficiary.accountNumber,testData.beneficiary.bank);
            }
        );


        // 4. TRANSFER FUNDS

        await test.step("Transfer funds",async () => {

                //await transferPage.openTransferPage();

                await transferPage.transferFunds(testData.beneficiary.name,testData.transfer.amount);
                await transferPage.verifyOtp();
                await transferPage.expectTransactionStatus('Successful')
            }
        );


        // 5. VALIDATE TRANSACTION HISTORY
        await test.step(
            "Validate transaction history",
            async () => {

                await transactionPage
                    .openTransactionHistory();

                
                const expectedAmount =
                    Number(
                        testData.transfer.amount
                    ).toFixed(2);

                await transactionPage
                    .verifyTransaction(
                        testData.beneficiary.name,
                        expectedAmount
                    );
            }
        );        
        // 6. LOGOUT

        await test.step(
            "Logout",
            async () => {
                await logoutPage.logout();
            }
        );

    });

});
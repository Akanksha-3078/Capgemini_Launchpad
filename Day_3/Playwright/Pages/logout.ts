import { Page, Locator, expect } from "@playwright/test";

export class LogoutPage {

    readonly page: Page;
    readonly logoutButton: Locator;
    readonly usernameField: Locator;

    constructor(page: Page) {

        this.page = page;

        this.logoutButton = page.getByRole('button', { name: 'Sign Out' })

        this.usernameField =
            page.locator(
                'input[name="username"]'
            );
    }

    async logout() {

        await this.logoutButton.click();

        await expect(
            this.usernameField
        ).toBeVisible();
    }
}
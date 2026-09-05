import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {

    readonly page: Page;

    // Locators
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.username =
            page.locator('input[name="username"]');

        this.password =
            page.locator('input[name="password"]');

        this.loginButton =
            page.locator('button[type="submit"]');
    }

    // Actions

    async navigateToLoginPage() {

        await this.page.goto(
            "https://playwrightpad.in/sandbox/banking"
        );
    }

    async login(
        username: string,
        password: string
    ) {

        await this.username.fill(username);

        await this.password.fill(password);

        await this.loginButton.click();

        // Verify successful login
        await expect(
            this.page.getByRole("heading", {
                name: /welcome/i
            })
        ).toBeVisible();
    }
}
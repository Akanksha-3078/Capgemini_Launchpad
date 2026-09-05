import { test, expect } from '@playwright/test';

test.describe('Account Tests', () => {

    test('Verify account page is displayed', async ({ page }) => {

        await page.goto('');

        await expect(page).toHaveURL(
            'https://playwrightpad.in/sandbox/banking'
        );
    });
});


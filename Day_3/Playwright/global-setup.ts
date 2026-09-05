import { chromium } from "@playwright/test";

async function globalSetup() {

    console.log('Global Setup Started');

    const browser = await chromium.launch();

    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto('https://www.playwrightpad.in/sandbox/banking');

     await page.getByRole('textbox', { name: 'Enter username' }).fill('apex_user');
    await page.getByPlaceholder('Enter password').fill('Password123!');

   await page.getByRole('button', { name: 'LOGIN' }).click();
    // Save authentication state
    await context.storageState({
        path: 'auth.json'
    });

    console.log('Authentication saved');

    await browser.close();

    console.log('Global Setup Completed');
}

export default globalSetup;



// import { chromium } from "@playwright/test";

// async function globalSetup(){

//     console.log('Global Setup started');

//     let browser = await chromium.launch();

//     let page = await browser.newPage();

//     await page.goto('https://playwrightpad.in/sandbox/banking');
//     await page.getByRole('textbox', { name: 'Enter username' }).fill('apex_user');
//     await page.getByPlaceholder('Enter password').fill('Password123!');

//     await page.getByRole('button', { name: 'LOGIN' }).click();

//     await browser.close();

//     // save authentication
//     await page.context().storageState({

//         path:
//         'auth.json'

// });
// console.log('Global Setup Completed');

// }

// export default globalSetup;
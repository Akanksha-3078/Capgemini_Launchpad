import { expect, Page } from '@playwright/test';

export class LoginPage {

constructor(
private page: Page
) {}


// locators 

private txtUser = '#user-name';

private txtPass = '#password';

private btnLogin ='#login-button';

async openApp() {

await this.page.goto(

'https://www.saucedemo.com/');

}

async login() {

console.log(
'Entering credentials');

// Example
await this.page.fill('input[name="user-name"]','standard_user');
await this.page.fill("//input[@id='password']",'secret_sauce');
//await this.page.click('input[name="login-button"]');

}

async clickLogin() {
console.log(
'Clicking the login button');

await this.page.click('input[name="login-button"]');

}

async suuccessfulLogin() {
    console.log('Login successful, user is redirected to the dashboard page');
}

async loginwithinvalidcredentials() {

console.log(
'Entering  Invalid credentials');

// Example
await this.page.fill('input[name="user-name"]','Hello');
await this.page.fill("//input[@id='password']",'World');
await this.page.click('input[name="login-button"]');
await expect(this.page.getByRole('heading', { name: 'Epic sadface: Username and password do not match any user in this service' })).toBeVisible();

}
async errormessage() {
    let message = await this.page.getByRole('heading', { name: 'Epic sadface: Username and password do not match any user in this service' }).textContent();
    console.log('Error message:', message);
}

async loginMessage(){
    console.log("Account is opened") ;
}

async loginwithmultipleusers(username: string, password : string){

    await this.page.fill(this.txtUser,username);

    await this.page.fill(this.txtPass,password);

    await this.page.click(this.btnLogin);

}


}


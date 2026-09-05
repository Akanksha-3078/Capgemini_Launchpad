const { Given, When, Then } = require('@cucumber/cucumber');
import { LoginPage } from '../../pages/LoginPage';
import { CustomWorld } from '../../support/world';


let login : LoginPage;

Given('the user is on the login page', async function (this: CustomWorld) {
  login = new LoginPage(this.page);
  await login.openApp();
  // Write code here that turns the phrase above into concrete actions
  // return 'pending';
});

When('the user enters valid username and password', async function (this: CustomWorld) {
  await login.login();
  // return 'pending';
});

When('clicks the login button', async function (this: CustomWorld) {
  await login.clickLogin();
  console.log('Clicking the login button');
  // return 'pending';
});

Then('the user should be redirected to the dashboard page', async function () {
  await login.suuccessfulLogin();
  // Write code here that turns the phrase above into concrete actions
  // return 'pending';
});

When('the user enters invalid username or password', async function (this: CustomWorld) {
  await login.loginwithinvalidcredentials();
  // Write code here that turns the phrase above into concrete actions
  //return 'pending';
});

Then('an error message should be displayed indicating invalid credentials', async function () {
   await login.errormessage();
  // Write code here that turns the phrase above into concrete actions
  // return 'pending';
});







When('User enters {string} and {string}', async  function (string: string, string2: string) {

    await login.loginwithmultipleusers(string,string2);
          
});


Then('User should view the error message', async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  //return 'pending';
});
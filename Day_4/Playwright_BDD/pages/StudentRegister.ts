import { Page, Locator, expect } from '@playwright/test';

export class StudentRegistrationPage {

   readonly page: Page;
   readonly nameInput: Locator;
   readonly emailInput: Locator;

    readonly maleRadio: Locator;
    readonly femaleRadio: Locator;
    readonly otherRadio: Locator;

    readonly mobileInput: Locator;
    readonly dobInput: Locator;
    readonly subjectInput: Locator;

    readonly sportsCheckbox: Locator;
    readonly readingCheckbox: Locator;
    readonly musicCheckbox: Locator;

    readonly submitButton: Locator;

   constructor( page: Page) {

    this.page = page;

    this.nameInput = page.getByRole('textbox', { name: 'Name:' })
    this.emailInput = page.getByRole('textbox', { name: 'Email:' })
    

    this.maleRadio = page.locator("input[type='radio']").first();
    this.femaleRadio = page.locator("input[type='radio']").nth(1);
    this.otherRadio = page.locator("input[type='radio']").nth(2);

 this.mobileInput = page.getByRole('textbox', { name: /Mobile\(10 Digits\):/i })
 this.dobInput =  page.locator("#dob")
 this.subjectInput = page.getByRole('textbox', { name: /Subjects:/i })

 this.sportsCheckbox = page.getByRole('checkbox', { name: /Hobbies:/i })
this.readingCheckbox = page.locator("//div[7]//div[1]//div[1]//div[2]//input[1]")
 this.musicCheckbox = page.locator("//div[7]//div[1]//div[1]//div[2]//input[1]")
 this.submitButton = page.locator('input.btn.btn-primary');
 }

 async openRegisterPage() {

await this.page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");

}

 async enterPersonalDetails(
 name: string,
 email: string,
 mobile: string,
 dob: string,
 subject: string) {
 await this.nameInput.fill(name);
 await this.emailInput.fill(email);
 await this.mobileInput.fill(mobile);
 await this.dobInput.fill(dob);
 await this.subjectInput.fill(subject);
 }

async selectGender(gender: string) {

 if (gender === 'Male') {
 await this.maleRadio.check();
 }
 else if (gender === 'Female') {
 await this.femaleRadio.check();
 }
 else if (gender === 'Other') {
 await this.otherRadio.check();
 }
 }

 async selectHobbies() {
 await this.readingCheckbox.check();
 }

async clickSubmit() {
   await expect(this.submitButton).toBeEnabled();
 //await this.submitButton.click();
 }

 async successSubmit() {
   console.log('Student registration successful');
 }

 async enterPersonalDetailsSS(
 name: string,
 email: string,
 mobile: string,
 dob: string,
 subject: string) {
 await this.nameInput.fill(name);
 await this.emailInput.fill(email);
 await this.mobileInput.fill(mobile);
 await this.dobInput.fill(dob);
 await this.subjectInput.fill(subject);
 }

}
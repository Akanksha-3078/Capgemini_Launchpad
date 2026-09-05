const { Given, When, Then } = require('@cucumber/cucumber');
import { StudentRegistrationPage } from '../../pages/StudentRegister';
import { CustomWorld } from '../../support/world';

let student: StudentRegistrationPage


Given('the user is on the Student Registration page', async function (this: CustomWorld) {
    student = new StudentRegistrationPage(this.page);
    await student.openRegisterPage();
  // Write code here that turns the phrase above into concrete actions
  //return 'pending';
});

When('the user enters Name, Email, Mobile Number, Date of Birth, Subjects', async function (this: CustomWorld) {
    await student.enterPersonalDetails('John Doe', 'john.doe@example.com', '1234567890', '2000-01-01', 'Mathematics');
  // Write code here that turns the phrase above into concrete actions
  //return 'pending';
});

When('selects Gender and Hobbies', async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await student.selectGender('Male');
  await student.selectHobbies();
});

When('clicks the submit button', async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await student.clickSubmit();
});

Then('the student registration should be successfully registered', async function (this: CustomWorld) {
    await student.successSubmit();
  // Write code here that turns the phrase above into concrete actions
  //return 'pending';
});


When('user enters {string}, {string}, {string}, {string}, {string}', async function (name: string, email: string, mobile: string, dob: string, subject: string) {
  await student.enterPersonalDetailsSS(name, email, mobile, dob, subject);
});
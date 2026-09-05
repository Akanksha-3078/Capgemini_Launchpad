Feature: Student Registration

  As a student
  I want to register by providing my personal details
  So that I can successfully submit my registration

  Scenario: Successfully register a student with valid details
    Given the user is on the Student Registration page
    When the user enters Name, Email, Mobile Number, Date of Birth, Subjects
    And selects Gender and Hobbies
    And clicks the submit button
    Then the student registration should be successfully registered


  Scenario: Successfully register a student with valid details by using Scenario Outline
    Given the user is on the Student Registration page
    When user enters "<name>", "<email>", "<mobile>", "<dob>", "<subject>"
    And selects Gender and Hobbies
    And clicks the submit button
    Then the student registration should be successfully registered
    Examples:

    | name       | email               | mobile       | dob        | subject      |
    | John Doe   | john.doe@example.com | 1234567890   | 2000-01-01 | Mathematics  |
    | Sameer Kumar   | sameer.kumar@example.com | 1234567890   | 2000-01-01 | Mathematics  |
    | Samaira Khan   | samaira.khan@example.com | 1234567890   | 2000-01-01 | Mathematics  |
   
    




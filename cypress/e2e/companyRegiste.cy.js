// Sign up as new company


//function to generate random company Name 
function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
// function to generate a random Tax Number with 9-digit number
function generateRandomTaxNumber() {
  return Math.floor(100000000 + Math.random() * 900000000);
}
//function to generate phone number started with EG 010
function generateRandomPhoneNumber() {
  const prefix = '010';
  const remainingDigits = Math.floor(Math.random() * 1e8).toString().padStart(8, '0');
  return prefix + remainingDigits;
}
// function to generate passowrd apply conditions: no repeat digits, no 2 digits in sequence
function generateRandomPassword() {
  const isSequential = (str) => {
    for (let i = 0; i < str.length - 1; i++) {
      if (parseInt(str[i]) === parseInt(str[i + 1]) - 1) {
        return true;
      }
    }
    return false;
  }

  let password = '';

  while (password.length < 5) {
    const digit = Math.floor(Math.random() * 10).toString();

    if (!password.includes(digit) && !isSequential(password + digit)) {
      password += digit;
    }
  }

  return password;
}


before(() => {
  cy.intercept({
    method: 'GET', 
    url: 'https://kyb.testdayra.com/instructions?passport_client_id=9a75fd18-6b3b-461a-8169-a56249763037&lang=ar',
  }).as('instructionsRequest');
  cy.visit('https://kyb.testdayra.com/?passport_client_id=9a75fd18-6b3b-461a-8169-a56249763037&lang=ar', { timeout: 60000 }); 
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    cy.wait(10000); 
});

describe('Create new account', () => {
    // generate random text and tax number
    const randomCompanyName = generateRandomString(10);
    const randomTaxNumber = generateRandomTaxNumber().toString();
    // Remove spaces from randomTaxNumber
    const normalizedRandomTaxNumber = randomTaxNumber.replace(/\s/g, '');

    const randomName = generateRandomString(10);
    const randomLastName = generateRandomString(10);

    const randomPhone = generateRandomPhoneNumber();
    const randomPassword = generateRandomPassword();

  it('sign up ad new ', () => {
    
    cy.get('button[type="submit"].fs-18.bg-primary.fw-bold.custom-button.text-white.false.false.btn.btn-primary')
    .contains('حساب جديد')
    .click();

    cy.get('button[type="submit"].fs-18.bg-primary.fw-bold.custom-button.text-white.false.false.btn.btn-primary')
    .contains('التالي')
    .click();

    cy.get('button[type="submit"].fs-18.bg-primary.fw-bold.custom-button.text-white.false.false.btn.btn-primary')
    .contains('التالي')
    .click();

    cy.get('button[type="submit"].fs-18.bg-primary.fw-bold.custom-button.text-white.false.false.btn.btn-primary')
    .contains('التالي')
    .click();

    // Fill in the username and password fields
    cy.get('#companyName', { timeout: 20000 }).type(randomCompanyName);
    cy.get('#companyName').should('have.value', randomCompanyName);

    cy.get('#taxNumber').type(normalizedRandomTaxNumber);

    cy.get('button[type="submit"].fs-18.bg-primary.fw-bold.custom-button.text-white.false.false.btn.btn-primary')
      .contains('التالي')
      .click();


    cy.get('#firstName').type(randomName);
    cy.get('#firstName').should('have.value', randomName);

    cy.get('#familyName').type(randomLastName);
    cy.get('#phoneNumber').type(randomPhone);

    cy.get('button[type="submit"].fs-18.bg-primary.fw-bold.custom-button.text-white.false.false.btn.btn-primary')
      .contains('التالي')
      .click();
    
    cy.get('#password').type(randomPassword);
    cy.get('button[type="submit"].fs-18.bg-primary.fw-bold.custom-button.text-white.false.false.btn.btn-primary')
    .contains('التالي')
    .click();

    cy.get('#password').type(randomPassword);

    cy.get('#password').type(randomPassword);
    cy.get('button[type="submit"].fs-18.bg-primary.fw-bold.custom-button.text-white.false.false.btn.btn-primary')
    .contains('التالي')
    .click();

    // can't automate OTP step :D

    // validation 
    cy.get('p.mb-0.fs-16.text-primary.fw-bold.text-end.opacity-100.undefined')
        .should('be.visible');

    //compare that generated number is the same as number in OTP page 
    Cypress.Commands.add('assertPartialTextNormalized', (selector, partialText) => {
    cy.get(selector)
      .invoke('text')
      .then((actualText) => {
    const normalizedActualText = actualText.replace(/\s+/g, '');
    const normalizedPartialText = partialText.replace(/\s+/g, '');
    expect(normalizedActualText).to.include(normalizedPartialText);
    });
});

// Use the custom assertion to validate partial text
  cy.assertPartialTextNormalized('p.mb-0.fs-20.text-darkText.fw-medium.text-end.opacity-100.undefined', randomPhone);




  });
});

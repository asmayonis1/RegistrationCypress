# RegistrationCypress


Test Case that cover company register till OTP page, can't be automated 

## Getting Started

To get started, follow these steps:

1. Clone this repository.
2. Install the required dependencies using `npm install`.
       - `npm init -y`
       - `npm install cypress --save-dev`.
       - `npx cypress open`.
4. Run Cypress tests with `npx cypress run`.

## Usage

- Run tests: `npx cypress run`
- View test results: `npx cypress open`


## Coverage TestCase
- Auto generate company name / generate tex number/ First Name/ Last Name
- Auto generate Phone number: started with 010 and follow validation
- Auto generated password with rules: 5 digits with no 2 digits in sequance / and no dublicated numbers
- Auto generate password and repeat same password
- Validate inputs in OTP page: Till otp it's completed can't be automated  



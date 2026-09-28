import { LOGIN_ELEMENTS } from './elements';

Cypress.Commands.add('visitLoginPage', () => {
  cy.visit('/login');
});

Cypress.Commands.add('fillLoginEmail', (email) => {
  cy.get(LOGIN_ELEMENTS.emailInput).clear().type(email);
});

Cypress.Commands.add('fillLoginPassword', (password) => {
  cy.get(LOGIN_ELEMENTS.passwordInput).clear().type(password);
});

Cypress.Commands.add('clickLoginSubmit', () => {
  cy.get(LOGIN_ELEMENTS.submitButton).click();
});

Cypress.Commands.add('login', (email, password) => {
  cy.fillLoginEmail(email);
  cy.fillLoginPassword(password);
  cy.clickLoginSubmit();
});

Cypress.Commands.add('validateSuccessfulLogin', () => {  
  cy.contains('Serverest Store').should('be.visible');
  cy.contains('Logout').should('be.visible');
});
import { HOME_ELEMENTS } from './elements';

Cypress.Commands.add('searchProduct', (productName) => {
  cy.intercept('GET', '**/produtos*').as('getProdutos');

  cy.get(HOME_ELEMENTS.searchInput).clear().type(productName);
  cy.get(HOME_ELEMENTS.searchButton).click();

  cy.wait('@getProdutos').its('response.statusCode').should('eq', 200);
});

Cypress.Commands.add('addProductToShoppingList', () => {
  cy.get(HOME_ELEMENTS.addToListButton).first().click();
});
import { SHOPPING_LIST_ELEMENTS } from './elements';

Cypress.Commands.add('validateProductInShoppingList', (product) => {
  cy.url().should('include', '/minhaListaDeProdutos');
  cy.contains('Lista de Compras').should('be.visible');
  cy.contains(product.nome).should('be.visible');
  
  cy.contains(new RegExp(product.preco, 'i')).should('be.visible');
});

Cypress.Commands.add('clearShoppingList', () => {
  cy.get(SHOPPING_LIST_ELEMENTS.clearListButton).click();
});

Cypress.Commands.add('validateEmptyShoppingList', (product) => {
  if (product) {
    cy.contains(product.nome).should('not.exist');
  }
  cy.contains('Seu carrinho está vazio').should('be.visible');
});
import users from '../../fixtures/users.json';
import products from '../../fixtures/products.json';

describe('E2E - Shopping List Suite (ServeRest)', () => {

  beforeEach(() => {
    cy.clearLocalStorage();

    const user = users.validUser;

    cy.setupUsuarioAPI(user);
    cy.visitLoginPage();
    cy.login(user.email, user.password);
    cy.validateSuccessfulLogin();
  });

  it('Should search for a product, add it to the shopping list and verify redirection', () => {
    const product = products.validProduct;

    cy.searchProduct(product.nome);
    cy.addProductToShoppingList();
    cy.validateProductInShoppingList(product);
  });

  it('Should clear all items from the shopping list successfully', () => {
    const product = products.validProduct;

    cy.searchProduct(product.nome);
    cy.addProductToShoppingList();
    cy.validateProductInShoppingList(product);

    cy.clearShoppingList();
    cy.validateEmptyShoppingList(product);
  });

});
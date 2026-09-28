declare namespace Cypress {
  interface Chainable {
    /**
     * Cadastra ou garante a existência do usuário de teste via API
     * @example cy.setupUsuarioAPI(user)
     */
    setupUsuarioAPI(usuario: any): Chainable<void>;

    /**
     * Visits the login page
     * @example cy.visitLoginPage()
     */
    visitLoginPage(): Chainable<void>;

    /**
     * Fills in the email field on the login page
     * @example cy.fillLoginEmail('email@example.com')
     */
    fillLoginEmail(email: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Fills in the password field on the login page
     * @example cy.fillLoginPassword('securePassword123')
     */
    fillLoginPassword(password: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Clicks the submit button on the login page
     * @example cy.clickLoginSubmit()
     */
    clickLoginSubmit(): Chainable<JQuery<HTMLElement>>;

    /**
     * Performs the full login flow by filling email, password, and clicking submit
     * @example cy.login('email@example.com', 'securePassword123')
     */
    login(email: string, password: string): Chainable<void>;

    /**
     * Validates successful login state
     * @example cy.validateSuccessfulLogin()
     */
    validateSuccessfulLogin(): Chainable<void>;

    /**
     * Searches for a product on the home page
     * @example cy.searchProduct('Astrid')
     */
    searchProduct(productName: string): Chainable<void>;

    /**
     * Adds the searched product to the shopping list
     * @example cy.addProductToShoppingList()
     */
    addProductToShoppingList(): Chainable<JQuery<HTMLElement>>;

    /**
     * Validates product presence on the shopping list page
     * @example cy.validateProductInShoppingList(product)
     */
    validateProductInShoppingList(product: any): Chainable<void>;

    /**
     * Clears all items from the shopping list
     * @example cy.clearShoppingList()
     */
    clearShoppingList(): Chainable<JQuery<HTMLElement>>;

    /**
     * Validates that the shopping list is empty
     * @example cy.validateEmptyShoppingList(product)
     */
    validateEmptyShoppingList(product?: any): Chainable<void>;
  }
}
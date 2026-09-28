declare namespace Cypress {
  interface Chainable {
    /**
     * Registers a new user via API
     * @example cy.createUser(userPayload)
     */
    createUser(userPayload: object): Chainable<Response<any>>;

    /**
     * Performs a login request via API
     * @example cy.login({ email: 'test@qa.com', password: '123' })
     */
    login(credentials: object): Chainable<Response<any>>;

    /**
     * Retrieves a list of products via API
     * @example cy.getProducts({ preco: 470 })
     */
    getProducts(queryParams?: object): Chainable<Response<any>>;
  }
}
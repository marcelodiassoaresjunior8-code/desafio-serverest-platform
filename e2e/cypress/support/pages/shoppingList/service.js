export class ProductService {
  static createProduct(produto, token) {
    const apiUrl = Cypress.env('apiUrl');
    return cy.request({
      method: 'POST',
      url: `${apiUrl}/produtos`,
      headers: { authorization: token },
      body: produto,
      failOnStatusCode: false
    });
  }

  static getProducts() {
    const apiUrl = Cypress.env('apiUrl');
    return cy.request({
      method: 'GET',
      url: `${apiUrl}/produtos`
    });
  }

  static updateProduct(productId, produto, token) {
    const apiUrl = Cypress.env('apiUrl');
    return cy.request({
      method: 'PUT',
      url: `${apiUrl}/produtos/${productId}`,
      headers: { authorization: token },
      body: produto
    });
  }
}
export class AuthService {
  static login(email, password) {
    const apiUrl = Cypress.env('apiUrl');
    return cy.request({
      method: 'POST',
      url: `${apiUrl}/login`,
      body: { email, password },
      failOnStatusCode: false
    });
  }
}
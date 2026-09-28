export class UserService {
  static createUser(usuario) {
    const apiUrl = Cypress.env('apiUrl');
    return cy.request({
      method: 'POST',
      url: `${apiUrl}/usuarios`,
      body: usuario,
      failOnStatusCode: false
    });
  }

  static getUserByEmail(email) {
    const apiUrl = Cypress.env('apiUrl');
    return cy.request({
      method: 'GET',
      url: `${apiUrl}/usuarios?email=${email}`
    });
  }

  static updateUser(userId, usuario) {
    const apiUrl = Cypress.env('apiUrl');
    return cy.request({
      method: 'PUT',
      url: `${apiUrl}/usuarios/${userId}`,
      body: usuario
    });
  }
}
Cypress.Commands.add('createUser', (userPayload) => {
  return cy.request({
    method: 'POST',
    url: '/usuarios',
    body: userPayload,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('login', (credentials) => {
  return cy.request({
    method: 'POST',
    url: '/login',
    body: credentials,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('getProducts', (queryParams = {}) => {
  return cy.request({
    method: 'GET',
    url: '/produtos',
    qs: queryParams,
    failOnStatusCode: false
  });
});
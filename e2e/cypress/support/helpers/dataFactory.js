Cypress.Commands.add('setupUsuarioAPI', (usuario) => {
  const apiUrl = Cypress.env('apiUrl');

  return cy.request({
    method: 'POST',
    url: `${apiUrl}/usuarios`,
    body: usuario,
    failOnStatusCode: false
  });
});
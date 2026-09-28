Cypress.Commands.add('setupUsuarioAPI', (usuario) => {
  const apiUrl = Cypress.env('apiUrl');

  return cy.request({
    method: 'POST',
    url: `${apiUrl}/usuarios`,
    body: usuario,
    failOnStatusCode: false
  }).then((response) => {
    const message = response.body?.message || '';

    if (response.status === 400 && message.includes('email')) {
      return cy.request({
        method: 'GET',
        url: `${apiUrl}/usuarios?email=${usuario.email}`
      }).then((getUserRes) => {
        if (getUserRes.body.usuarios && getUserRes.body.usuarios.length > 0) {
          const userId = getUserRes.body.usuarios[0]._id;
          return cy.request({
            method: 'PUT',
            url: `${apiUrl}/usuarios/${userId}`,
            body: usuario
          });
        }
      });
    }
  });
});

Cypress.Commands.add('loginAPI', (email, password) => {
  const apiUrl = Cypress.env('apiUrl');

  return cy.request({
    method: 'POST',
    url: `${apiUrl}/login`,
    body: { email, password },
    failOnStatusCode: false
  }).then((response) => {
    return response.body.authorization;
  });
});

Cypress.Commands.add('setupProdutoAPI', (produto, token) => {
  const apiUrl = Cypress.env('apiUrl');

  return cy.request({
    method: 'POST',
    url: `${apiUrl}/produtos`,
    headers: { authorization: token },
    body: produto,
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 400) {
      return cy.request({
        method: 'GET',
        url: `${apiUrl}/produtos`
      }).then((getProdRes) => {
        const existingProduct = getProdRes.body.produtos?.find(p => p.nome === produto.nome);
        if (existingProduct) {
          return cy.request({
            method: 'PUT',
            url: `${apiUrl}/produtos/${existingProduct._id}`,
            headers: { authorization: token },
            body: produto
          });
        }
      });
    }
  });
});
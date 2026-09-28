describe('API - Product Search', () => {
  it('Should list all registered products successfully', () => {
    cy.getProducts().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('quantidade');
      expect(response.body).to.have.property('produtos');
      expect(response.body.produtos).to.be.an('array');
    });
  });

  it('Should filter products using Query Parameters', () => {
    cy.getProducts({ preco: 470 }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('produtos');
      expect(response.body.produtos).to.be.an('array');
    });
  });
});
import { generateUserData } from '../support/utils/dataFactory';

describe('API - User Registration', () => {
  it('Should register a new user successfully using dynamic Faker data', () => {
    const newUser = generateUserData();

    cy.createUser(newUser).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id');
    });
  });
});
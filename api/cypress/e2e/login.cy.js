import { generateUserData } from '../support/utils/dataFactory';

describe('API - Authentication (Login)', () => {
  it('Should login successfully with valid credentials', () => {
    const user = generateUserData();

    cy.createUser(user).then(() => {
      cy.login({ email: user.email, password: user.password }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Login realizado com sucesso');
        expect(response.body).to.have.property('authorization');
        expect(response.body.authorization).to.include('Bearer ');
      });
    });
  });

  it('Should return 401 status code when attempting login with invalid credentials', () => {
    const invalidCredentials = {
      email: 'non_existent_user_qa@invalid.com',
      password: 'wrongPassword123'
    };

    cy.login(invalidCredentials).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq('Email e/ou senha inválidos');
    });
  });
});
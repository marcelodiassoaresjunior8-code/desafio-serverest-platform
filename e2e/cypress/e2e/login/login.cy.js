import usuarios from '../../fixtures/users.json';

describe('E2E - Login Suite (ServeRest)', () => {

    it('Should successfully log in with valid credentials', () => {
        const user = usuarios.validUser;

        cy.setupUsuarioAPI(user);

        cy.visitLoginPage();
        cy.login(user.email, user.password);

        cy.validateSuccessfulLogin();
    });
});
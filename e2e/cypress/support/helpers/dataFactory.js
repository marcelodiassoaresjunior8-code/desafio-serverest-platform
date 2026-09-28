import { UserService } from '../pages/users/service';
import { AuthService } from '../pages/login/service';
import { ProductService } from '../pages/shoppingList/service';

Cypress.Commands.add('setupUsuarioAPI', (usuario) => {
  return UserService.createUser(usuario).then((response) => {
    const message = response.body?.message || '';

    if (response.status === 400 && message.includes('email')) {
      return UserService.getUserByEmail(usuario.email).then((getUserRes) => {
        const usersList = getUserRes.body.usuarios;
        if (usersList && usersList.length > 0) {
          const userId = usersList[0]._id;
          return UserService.updateUser(userId, usuario);
        }
      });
    }
  });
});

Cypress.Commands.add('loginAPI', (email, password) => {
  return AuthService.login(email, password).then((response) => {
    return response.body.authorization;
  });
});

Cypress.Commands.add('setupProdutoAPI', (produto, token) => {
  return ProductService.createProduct(produto, token).then((response) => {
    if (response.status === 400) {
      return ProductService.getProducts().then((getProdRes) => {
        const existingProduct = getProdRes.body.produtos?.find(p => p.nome === produto.nome);
        if (existingProduct) {
          return ProductService.updateProduct(existingProduct._id, produto, token);
        }
      });
    }
  });
});
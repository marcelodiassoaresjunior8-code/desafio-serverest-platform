import { faker } from '@faker-js/faker';

export const generateUserData = (isAdmin = 'true') => {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 10 }),
    administrador: isAdmin
  };
};
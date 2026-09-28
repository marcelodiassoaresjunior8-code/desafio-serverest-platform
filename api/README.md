# 🚀 API Test Suite — ServeRest Platform

Projeto de automação de testes de **API REST** para a plataforma **ServeRest**, abrangendo validações de contratos, autenticação, códigos de status HTTP e regras de negócio dos endpoints.

A solução foi desenvolvida com **Cypress** e **JavaScript**, com geração dinâmica de massa de dados utilizando **Faker**, suporte a tipagem e autocomplete por meio de **TypeScript Declaration (`index.d.ts`)**, geração de relatórios interativos com **Allure Report** e integração contínua via **GitHub Actions**.

---

## 🛠️ Tecnologias Utilizadas

- **[Cypress](https://www.cypress.io/):** framework principal para execução de requisições HTTP e automação dos testes de API, utilizando `cy.request`.
- **JavaScript (ES6+):** linguagem utilizada no desenvolvimento dos testes e da estrutura de automação.
- **[@faker-js/faker](https://fakerjs.dev/):** biblioteca utilizada para geração dinâmica e aleatória de dados de teste, como usuários, e-mails e senhas.
- **TypeScript Declaration (`index.d.ts`):** fornece autocomplete (IntelliSense) e suporte à tipagem dos Custom Commands no VS Code.
- **[Allure Report](https://allurereport.org/):** ferramenta para geração de relatórios visuais e interativos das execuções de teste.
- **[GitHub Actions](https://github.com/features/actions):** responsável pela execução automatizada do pipeline de Integração Contínua (CI).
- **GitHub Pages:** utilizado para publicação automatizada dos relatórios do Allure.

---

## 🏗️ Arquitetura e Padrões de Projeto

O projeto utiliza uma arquitetura modular com foco na separação entre **requisições HTTP, geração de dados e validações dos testes**.

Essa organização busca promover **reutilização, legibilidade, facilidade de manutenção e isolamento das responsabilidades**.

### Principais componentes

1. **Abstração das requisições HTTP (`commands.js`)**

   Encapsula as chamadas à API realizadas com `cy.request`, centralizando endpoints, métodos HTTP, parâmetros e demais configurações por meio de Custom Commands do Cypress.

2. **Massa de dados dinâmica / Data Factory (`dataFactory.js`)**

   Utiliza a biblioteca `@faker-js/faker` para gerar dados de teste dinamicamente a cada execução. Essa abordagem reduz a dependência de dados estáticos e ajuda a evitar colisões de estado durante o cadastro de entidades na API.

3. **Camada de especificações / Specs (`cypress/e2e/`)**

   Mantém os cenários de teste organizados por módulo, concentrando as regras de negócio e asserções (`expect`). As validações contemplam códigos de status, mensagens de retorno, tempos de resposta e estrutura dos contratos JSON, incluindo propriedades como `_id` e `authorization`.

4. **Autocomplete e tipagem (`index.d.ts` + `jsconfig.json`)**

   Estende as interfaces do Cypress para disponibilizar autocomplete, tipagem e documentação inline durante a utilização dos Custom Commands no editor.

---

## 📁 Estrutura do Projeto

```text
api-test-serverest-platform/
├── .github/
│   └── workflows/
│       └── api.yml                 # Pipeline de CI/CD no GitHub Actions
├── cypress/
│   ├── e2e/                        # Especificações dos testes por módulo (Specs)
│   │   ├── login.cy.js
│   │   ├── products.cy.js
│   │   └── users.cy.js
│   └── support/
│       ├── utils/
│       │   └── dataFactory.js      # Geração dinâmica de dados com Faker
│       ├── commands.js             # Custom Commands para requisições HTTP
│       ├── e2e.js                  # Ponto de entrada global do Cypress
│       └── index.d.ts              # Tipagem e suporte ao autocomplete
├── .gitignore                      # Arquivos e diretórios ignorados pelo Git
├── cypress.config.js               # Configuração global do Cypress e do Allure
├── jsconfig.json                   # Configuração do IntelliSense do VS Code
├── package-lock.json               # Lockfile das dependências do Node.js
├── package.json                    # Dependências e scripts de execução
└── README.md                       # Documentação do projeto
```

---

## 💡 Suporte a Autocomplete com `index.d.ts`

Para aumentar a produtividade durante o desenvolvimento e garantir maior precisão na utilização dos Custom Commands, o arquivo `cypress/support/index.d.ts` adiciona tipagem estática, documentação JSDoc e exemplos de uso.

### Exemplo de definição (`index.d.ts`)

```typescript
declare namespace Cypress {
  interface Chainable {
    /**
     * Cadastra um novo usuário por meio da API.
     * @example cy.createUser(userPayload)
     */
    createUser(userPayload: object): Chainable<Response<any>>;

    /**
     * Realiza uma requisição de login por meio da API.
     * @example cy.login({ email: 'test@qa.com', password: '123' })
     */
    login(credentials: object): Chainable<Response<any>>;

    /**
     * Consulta a lista de produtos por meio da API.
     * @example cy.getProducts({ preco: 470 })
     */
    getProducts(queryParams?: object): Chainable<Response<any>>;
  }
}
```

O arquivo **`jsconfig.json`**, localizado na raiz do projeto, configura a inclusão dessas definições no editor:

```json
{
  "compilerOptions": {
    "target": "es6",
    "moduleResolution": "bundler",
    "types": ["cypress", "node"]
  },
  "include": [
    "cypress/**/*.js",
    "cypress/support/index.d.ts"
  ]
}
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js:** versão 18 ou superior.
- **npm:** versão 9 ou superior.

### 1. Clonar o repositório e instalar as dependências

```bash
git clone https://github.com/diassoaresjuniormarcelo48-a11y/api-test-serverest-platform.git
cd api-test-serverest-platform
npm install
```

### 2. Executar os testes em modo headless

Executa a suíte de testes de API diretamente pelo terminal:

```bash
npm run cy:run
```

### 3. Executar em modo interativo

Abre a interface gráfica do Cypress para acompanhar a execução dos testes e inspecionar as requisições e respostas HTTP:

```bash
npm run cy:open
```

### 4. Executar a suíte e gerar o relatório Allure

Para limpar os resultados anteriores, executar os testes, gerar o relatório e abri-lo no navegador:

```bash
npm run allure:clear
npm run cy:run
npm run allure:generate
npm run allure:open
```

Também é possível utilizar o comando unificado, caso esteja configurado no `package.json`:

```bash
npm test
```

---

## 🔄 Integração Contínua (CI/CD) e Allure Report

A cada `push` ou `pull request` direcionado às branches `main` ou `master`, o workflow do **GitHub Actions** (`.github/workflows/api.yml`) é executado automaticamente.

O pipeline realiza as seguintes etapas:

1. Realiza o checkout do código do repositório.
2. Configura o ambiente de execução com **Node.js v20** e cache das dependências.
3. Instala as dependências utilizando `npm ci`.
4. Executa a suíte de testes de API em modo headless e gera os resultados brutos utilizados pelo Allure.
5. Gera o relatório estático em HTML utilizando o Allure CLI.
6. Publica o relatório atualizado no **GitHub Pages**, utilizando a branch `gh-pages`.

---

## 📝 Autor

Desenvolvido por **Marcelo Soares**.

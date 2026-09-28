# 🚀 E2E Test Suite — ServeRest Platform

Projeto de automação de testes **End-to-End (E2E)** para a plataforma **ServeRest**, abrangendo testes de Front-End e API. Desenvolvido com **Cypress** e **JavaScript**, com suporte a tipagem e autocomplete por meio de **TypeScript Declaration (`index.d.ts`)**, geração de relatórios interativos com **Allure Report** e integração contínua via **GitHub Actions**.

---

## 🛠️ Tecnologias Utilizadas

- **[Cypress](https://www.cypress.io/):** framework principal para automação dos testes E2E.
- **JavaScript (ES6+):** linguagem utilizada no desenvolvimento dos testes.
- **TypeScript Declaration (`index.d.ts`):** fornece autocomplete (IntelliSense) e tipagem estática para os Custom Commands no VS Code.
- **[Allure Report](https://allurereport.org/):** ferramenta para geração de relatórios visuais e interativos dos testes.
- **[GitHub Actions](https://github.com/features/actions):** utilizada para execução do pipeline de integração contínua (CI).
- **GitHub Pages:** hospedagem automatizada do relatório Allure.

---

## 🏗️ Arquitetura e Padrões de Projeto

O projeto utiliza uma arquitetura modular baseada no desacoplamento por responsabilidades (**Page Objects**, **Domain Services** e **Custom Commands**), garantindo **alta reusabilidade, manutenibilidade e separação clara de conceitos (SoC)**.

### Principais componentes

1. **Mapeamento de Elementos (`elements.js`)**  
   Centraliza exclusivamente os seletores do DOM (`data-testid`, seletores CSS e XPath).

2. **Ações de Interface (`actions.js`)**  
   Encapsula as interações de UI (preenchimentos, cliques e asserções) por meio de `Cypress.Commands`.

3. **Serviços de Domínio (`service.js`)**  
   Centraliza e isola todas as chamadas de API (`cy.request`) divididas por domínio (`login`, `shoppingList`, `users`), abstraindo verbos e endpoints HTTP.

4. **Data Factory / Setup via API (`dataFactory.js`)**  
   Orquestra os serviços de domínio (`service.js`) para preparar e garantir a massa de dados de teste (usuários, autenticação e produtos) via API antes das interações de UI, reduzindo o tempo total de execução.

5. **Massa de Dados Estática (`cypress/fixtures/`)**  
   Armazena templates e dados de teste reutilizáveis em formato JSON.

6. **Autocomplete e Tipagem (`index.d.ts` + `jsconfig.json`)**  
   Define os tipos e documentação JSDoc em inglês para todos os Custom Commands do Cypress.

---

## 📁 Estrutura do Projeto

```text
e2e-test-serverest-platform/
├── .github/
│   └── workflows/
│       └── e2e.yml                 # Pipeline de CI/CD no GitHub Actions
├── cypress/
│   ├── e2e/                        # Especificações dos testes (Specs)
│   │   ├── login/
│   │   │   └── login.cy.js
│   │   └── shoppingList/
│   │       └── shoppingList.cy.js
│   ├── fixtures/                   # Massa de dados estática em JSON
│   │   ├── example.json
│   │   ├── products.json
│   │   └── users.json
│   └── support/
│       ├── helpers/                # Data Factory e orquestração de massa
│       │   └── dataFactory.js
│       ├── pages/                  # Arquitetura modular por domínio (Actions, Elements, Services)
│       │   ├── home/
│       │   │   ├── actions.js
│       │   │   └── elements.js
│       │   ├── login/
│       │   │   ├── actions.js
│       │   │   ├── elements.js
│       │   │   └── service.js
│       │   ├── shoppingList/
│       │   │   ├── actions.js
│       │   │   ├── elements.js
│       │   │   └── service.js
│       │   └── users/
│       │       └── service.js
│       ├── commands.js             # Custom Commands gerais
│       ├── e2e.js                  # Ponto de entrada das configurações de suporte
│       └── index.d.ts              # Definições de tipo TypeScript para comandos Cypress
├── cypress.config.js               # Configuração global do Cypress e Allure
├── jsconfig.json                   # Configuração do IntelliSense no VS Code
├── package.json                    # Dependências e scripts do projeto
└── README.md                       # Documentação do projeto
```

---

## 💡 Suporte a Autocomplete com `index.d.ts`

Para aumentar a produtividade e evitar erros na utilização dos Custom Commands de UI e API, o arquivo `cypress/support/index.d.ts` estende as interfaces do Cypress com suporte completo ao IntelliSense.

### Exemplo de definição (`index.d.ts`)

```typescript
declare namespace Cypress {
  interface Chainable {
    /**
     * Registers or ensures the existence of the test user via API
     * @example cy.setupUsuarioAPI(user)
     */
    setupUsuarioAPI(usuario: any): Chainable<any>;

    /**
     * Performs login via API and returns the authorization token
     * @example cy.loginAPI('email@example.com', 'password123').then((token) => { ... })
     */
    loginAPI(email: string, password: string): Chainable<string>;

    /**
     * Registers or updates a product via API using the authorization token
     * @example cy.setupProdutoAPI(product, token)
     */
    setupProdutoAPI(produto: any, token: string): Chainable<any>;
  }
}
```

O arquivo **`jsconfig.json`** garante a resolução desses tipos no VS Code:

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
git clone https://github.com/diassoaresjuniormarcelo48-a11y/e2e-test-serverest-platform.git
cd e2e-test-serverest-platform
npm install
```

### 2. Executar em modo interativo

Abre o **Cypress Test Runner**, permitindo executar e acompanhar os testes em tempo real:

```bash
npx cypress open
```

### 3. Executar os testes em modo headless

Executa os testes no terminal e gera as evidências para o Allure Report:

```bash
npm run cy:run
```

### 4. Gerar e visualizar o relatório Allure localmente

Gera os arquivos do relatório:

```bash
npm run allure:generate
```

Abre o servidor local para navegação interativa no relatório:

```bash
npm run allure:open
```

---

## 🔄 Integração Contínua (CI/CD) e Allure Report

A cada `push` ou `pull request` direcionado às branches principais, o pipeline no **GitHub Actions** (`.github/workflows/e2e.yml`) é acionado automaticamente.

O pipeline executa as seguintes etapas:

1. Provisionamento do ambiente Node.js.
2. Instalação das dependências do projeto.
3. Execução completa dos testes Cypress em modo headless.
4. Coleta dos artefatos e relatórios de execução.
5. Geração do Allure Report.
6. Publicação automática do relatório no **GitHub Pages** (branch `gh-pages`), mantendo o histórico de execuções anteriores.

---

## 📝 Autor

Desenvolvido por **Marcelo Soares**.
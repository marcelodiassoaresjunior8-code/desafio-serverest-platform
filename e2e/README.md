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

O projeto utiliza uma arquitetura modular baseada em **Page Objects desacoplados e Custom Commands**, com foco em **reutilização, manutenibilidade e legibilidade**.

### Principais componentes

1. **Desacoplamento de elementos (`elements.js`)**  
   Centraliza exclusivamente os seletores do DOM, como `data-testid` e seletores CSS.

2. **Ações reutilizáveis (`actions.js`)**  
   Encapsula as interações e rotinas executadas nas páginas por meio de `Cypress.Commands`.

3. **Massa de dados / Fixtures (`cypress/fixtures/`)**  
   Armazena dados estáticos de teste em formato JSON, como usuários e produtos.

4. **Data Factory / Setup via API (`dataFactory.js`)**  
   Responsável pela preparação das pré-condições dos testes e pela criação de usuários por meio de requisições HTTP, utilizando comandos como `cy.setupUsuarioAPI`. Essa abordagem reduz a dependência da camada de UI e otimiza o tempo de execução dos testes.

5. **Autocomplete e tipagem (`index.d.ts` + `jsconfig.json`)**  
   Define a tipagem dos Custom Commands do Cypress e habilita o autocomplete e o IntelliSense no VS Code.

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
│       ├── helpers/                # Data Factory e suporte às requisições de API
│       │   └── dataFactory.js
│       ├── pages/                  # Elementos e ações organizados por página
│       │   ├── home/
│       │   │   ├── actions.js
│       │   │   └── elements.js
│       │   ├── login/
│       │   │   ├── actions.js
│       │   │   └── elements.js
│       │   └── shoppingList/
│       │       ├── actions.js
│       │       └── elements.js
│       ├── commands.js             # Custom Commands do Cypress
│       ├── e2e.js                  # Ponto de entrada e configuração de suporte
│       └── index.d.ts              # Definição de tipos dos Custom Commands
├── cypress.config.js               # Configuração global do Cypress e do Allure
├── jsconfig.json                   # Configuração do IntelliSense do VS Code
├── package.json                    # Dependências e scripts do projeto
└── README.md                       # Documentação do projeto
```

---

## 💡 Suporte a Autocomplete com `index.d.ts`

Para aumentar a produtividade durante o desenvolvimento e reduzir erros na utilização dos Custom Commands, o arquivo `cypress/support/index.d.ts` estende a interface do Cypress, adicionando tipagem, documentação JSDoc e exemplos de uso.

### Exemplo de definição (`index.d.ts`)

```typescript
declare namespace Cypress {
  interface Chainable {
    /**
     * Realiza o login completo, preenchendo e-mail e senha e submetendo o formulário.
     * @example cy.login('usuario@email.com', 'senha123')
     */
    login(email: string, password: string): Chainable<void>;

    /**
     * Remove todos os itens da lista de compras.
     * @example cy.clearShoppingList()
     */
    clearShoppingList(): Chainable<JQuery<HTMLElement>>;
  }
}
```

O arquivo **`jsconfig.json`**, localizado na raiz do projeto, configura o suporte ao IntelliSense no editor:

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

Abre o **Cypress Test Runner**, permitindo executar e acompanhar os testes de forma interativa:

```bash
npx cypress open
```

### 3. Executar os testes em modo headless

Executa os testes em modo headless e gera os resultados utilizados pelo Allure:

```bash
npm run cy:run
```

### 4. Gerar e visualizar o relatório Allure localmente

Gera o relatório estático a partir dos resultados brutos:

```bash
npm run allure:generate
```

Em seguida, inicia um servidor local para visualizar o relatório interativo:

```bash
npm run allure:open
```

---

## 🔄 Integração Contínua (CI/CD) e Allure Report

A cada `push` ou `pull request` direcionado às branches `main` ou `master`, o workflow do **GitHub Actions** (`.github/workflows/e2e.yml`) é executado automaticamente.

O pipeline realiza as seguintes etapas:

1. Configura o ambiente com a versão necessária do Node.js.
2. Instala as dependências do projeto.
3. Executa a suíte completa de testes Cypress em modo headless.
4. Coleta os resultados gerados durante a execução.
5. Gera o relatório Allure.
6. Publica automaticamente a nova versão do relatório no **GitHub Pages**, utilizando a branch `gh-pages`.
7. Preserva o histórico das execuções anteriores, permitindo acompanhar a evolução dos resultados dos testes.

---

## 📝 Autor

Desenvolvido por **Marcelo Soares**.

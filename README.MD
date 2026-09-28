# 🚀 Desafio Técnico — ServeRest Testing Platform

Este repositório unificado (modelo monorepo) contém as suítes completas de automação de testes para a plataforma **ServeRest**, contemplando validações de **API REST** e testes **End-to-End (E2E)** de interface gráfica.

---

## 📐 Motivo da Segregação Arquitetural

A separação dos projetos nas pastas `/api` e `/e2e` foi adotada por boas práticas de engenharia de software e arquitetura de testes:

- **Isolamento de Escopo e Dependências:**  
  Testes de API possuem foco em tempo de resposta, contratos JSON, status codes e regras de negócio via requisições HTTP (`cy.request`). Já os testes E2E focam em navegação, elementos do DOM, interações visuais e fluxos do usuário. Manter os ecossistemas segregados previne acoplamento desnecessário e contaminação de dependências.

- **Otimização de Pipelines (CI/CD):**  
  A suíte de API executa de forma ultra-rápida em modo *headless*, permitindo *feedback* imediato nas Pull Requests. A suíte E2E exige emulação de navegador e setup visual. A segregação permite acionar cada pipeline de forma independente ou paralela no GitHub Actions.

- **Organização e Manutenibilidade:**  
  Facilita a evolução independente dos Page Objects, Data Factories e Custom Commands de cada camada sem inflar a configuração global do Cypress.

- **Consolidação em Repositório Único:**  
  Apesar da separação lógica e técnica, ambas as aplicações foram consolidadas neste repositório único para centralizar a entrega do desafio e simplificar a avaliação.

---

## 🔗 Links de Acesso aos Repositórios

Você pode navegar diretamente pelas pastas deste repositório unificado ou acessar os repositórios standalone dedicados no GitHub:

### Repositório Unificado (Monorepo)
* 🔗 **[desafio-serverest-platform](https://github.com/marcelodiassoaresjunior8-code/desafio-serverest-platform)** *(Repositório Atual)*

### Repositórios Dedicados (Projetos Isolados)
* 📦 **API Tests Repository:** [marcelodiassoaresjunior8-code/api-test-serverest-platform](https://github.com/marcelodiassoaresjunior8-code/api-test-serverest-platform)
* 📦 **E2E Tests Repository:** [marcelodiassoaresjunior8-code/e2e-test-serverest-platform](https://github.com/marcelodiassoaresjunior8-code/e2e-test-serverest-platform)

---

## 📁 Estrutura do Repositório

```text
desafio-serverest-platform/
├── api/                            # Suíte de testes automatizados de API REST
│   ├── cypress/
│   │   ├── e2e/                    # Specs de API (login, users, products)
│   │   └── support/                # Custom commands de HTTP, Data Factory e d.ts
│   ├── cypress.config.js
│   ├── package.json
│   └── README.md                   # Documentação detalhada da API
├── e2e/                            # Suíte de testes automatizados E2E (UI)
│   ├── cypress/
│   │   ├── e2e/                    # Specs de interface (login, shoppingList)
│   │   └── support/                # Page Objects, Elements e Actions
│   ├── cypress.config.js
│   ├── package.json
│   └── README.md                   # Documentação detalhada do E2E
└── README.md                       # Documentação principal do projeto

## 🛠️ Como Executar os Testes

Para instruções completas de instalação, execução local (*headless* ou interativa), relatórios no **Allure** e variáveis de ambiente, consulte a documentação de cada diretório:

## 👨‍💻 Autor

Desenvolvido por **Marcelo Soares**
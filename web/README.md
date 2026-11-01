# Automação WebDojo com Cypress

Projeto de testes de ponta a ponta desenvolvido durante o treinamento Ninja do Cypress. Os cenários exercitam login, formulários, tabelas, alertas JavaScript, consulta de CEP, links, hover, iframe e Kanban.

## Estrutura do projeto

A aplicação está nesta pasta `web`. A suíte principal de automação está na raiz do repositório `webdojo`, um nível acima:

```text
webdojo/
├── cypress.config.js              # Configuração da suíte principal
├── package.json                   # Scripts da automação
├── cypress/
│   ├── e2e/                       # Cenários de ponta a ponta
│   ├── fixtures/
│   │   ├── address.json           # Dados da consulta de CEP
│   │   ├── consultancy.json       # Dados de consultoria individual e empresarial
│   │   └── Pdfdeexemplo.pdf        # Arquivo usado no upload do formulário
│   └── support/
│       ├── actions/
│       │   └── consultancy.actions.js  # Preenchimento, envio e validação do modal
│       ├── commands.js            # Comandos de login e navegação
│       ├── e2e.js                 # Carregamento do suporte e dos comandos
│       └── utils.js               # Utilitário de formatação da data
└── web/
    ├── dist/                      # Aplicação pronta para servir
    ├── package.json               # Script dev do servidor local
    └── README.md                  # Esta documentação
```

Há também arquivos de testes em `web/cypress`, trazidos pelo histórico remoto. Os comandos documentados abaixo usam a suíte principal em `webdojo/cypress`.

## Preparação

Instale Node.js 22 ou superior e npm. A partir da raiz do repositório `webdojo`, instale as dependências da automação e da aplicação:

```powershell
npm install
npm --prefix web install
```

## Iniciar a aplicação

Na pasta `webdojo/web`, execute:

```powershell
npm run dev
```

Mantenha esse terminal aberto. A aplicação fica disponível em **http://localhost:3000**. O usuário de demonstração é `papito@webdojo.com`, com senha `katana123`.

## Executar os testes

Abra outro terminal na raiz do repositório `webdojo`, onde estão `cypress.config.js` e o `package.json` da automação:

| Comando | Execução |
| --- | --- |
| `npm test` | Regressão completa em 1440 × 900 |
| `npm run test:ui` | Interface do Cypress com viewport 1440 × 900 |
| `npm run test:login` | Suíte de login em 1440 × 900 |
| `npm run test:login:mobile` | Suíte de login em 414 × 896, equivalente ao viewport do iPhone XR |

Para escolher outra suíte pela linha de comandos:

```powershell
npx cypress run --spec cypress/e2e/cep.cy.js --config viewportWidth=1440,viewportHeight=900
```

O teste mobile verifica o comportamento da página web nessa resolução. Ele não executa um aplicativo nativo de celular.

## Configuração e comandos reutilizáveis

O `baseUrl` da suíte principal é definido em `webdojo/cypress.config.js`. Os comandos usam rotas relativas, como `/` e `/dashboard`. Para apontar para outro ambiente sem editar o arquivo:

```powershell
npm test -- --config baseUrl=http://localhost:3000,viewportWidth=1440,viewportHeight=900
```

- `cy.Login()` usa o token fixo do usuário de demonstração no localStorage e adiciona o cookie `login_date` antes de abrir o dashboard.
- `cy.Login(true)` executa o login pela interface.
- Os testes de login continuam preenchendo o formulário e validam também o cookie de data e o formato do token.
- `cy.goTo(buttonName, pageTitle)` navega pelo dashboard e verifica o título da página.
- Os comandos `fillConsultancyForm`, `submitConsultancyForm` e `validateConsultancyModal` ficam em `support/actions/consultancy.actions.js`.
- `getFormattedDate()` é exportada por `support/utils.js` e compartilhada entre os comandos e a suíte de login.

O login por injeção depende do mecanismo de autenticação do WebDojo de demonstração. Ele precisa ser revisto se esse mecanismo mudar.

## Fixtures e interceptação

As massas de teste ficam em `cypress/fixtures`. Os cenários importam os dados JSON e usam o PDF no upload de consultoria.

O teste de CEP intercepta `GET https://viacep.com.br/ws/<cep>/json/` com `cy.intercept()`. A resposta simulada tem status 200 e mapeia os dados de `address.json` para `logradouro`, `bairro`, `localidade` e `uf`. O teste aguarda `@getCep` antes de validar os campos.

Esse cenário verifica o comportamento da aplicação com uma resposta controlada; ele não confirma a disponibilidade real do ViaCEP.

## Evidências

A gravação de vídeo está habilitada. Ao executar pela raiz `webdojo`, as evidências ficam em `cypress/videos` e as capturas de falhas em `cypress/screenshots`. Arquivos baixados podem aparecer em `cypress/downloads`.

Essas três pastas são ignoradas pelo Git e podem ser removidas após a análise da execução.

## Uso e contribuição

Este projeto acompanha o treinamento Ninja do Cypress. Consulte o [README principal](../README.md) para as condições de uso e os canais de suporte definidos pelo autor. As alterações neste material de estudo devem respeitar essas condições.

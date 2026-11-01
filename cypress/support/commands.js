// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-real-events'
import './actions/consultancy.actions'
import { getFormattedDate } from './utils'

Cypress.Commands.add('acessarAplicacao', () => {
    cy.visit('/')
})

Cypress.Commands.add('submeterLogin', (email, senha) => {
    cy.visit('/')
    cy.get('#email').type(email)
    cy.get('#password').type(senha)
    cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('goTo', (buttonName, pageTitle) => {
    cy.contains('button', buttonName)
        .should('be.visible')
        .click()

        cy.contains('h1', pageTitle)
        .should('be.visible')
})


//helpers
//esse comands aproveita o token do usuário de demonstração do WebDojo para logar sem precisar da interface de login.
Cypress.Commands.add('Login', (ui = false) => {
    if (ui === true) {
        cy.acessarAplicacao()
        cy.submeterLogin('papito@webdojo.com', 'katana123')
    } else {
        // Token fixo do usuário de demonstração do WebDojo.
        const token = 'e1033d63a53fe66c0fd3451c7fd8f617'
        const loginDate = getFormattedDate()

        const domain = new URL(Cypress.config('baseUrl')).hostname
        cy.setCookie('login_date', loginDate, { domain, path: '/' })
        cy.visit('/dashboard', {
            onBeforeLoad(win) {
                win.localStorage.setItem('token', token)
            }
        })
    }
})

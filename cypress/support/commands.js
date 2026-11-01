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

Cypress.Commands.add('acessarAplicacao', () => {
    cy.viewport(1440, 900)
    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('submeterLogin', (email, senha) => {
    cy.viewport(1440, 900)
    cy.visit('http://localhost:3000')
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
Cypress.Commands.add('Login', () => {
     cy.acessarAplicacao()
        cy.submeterLogin('papito@webdojo.com', 'katana123')
})
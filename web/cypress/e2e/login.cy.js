describe('template spec', () => {
  it('Deve logar com sucesso', () => {
    cy.START()
    cy.submetLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')
  })

  it('não Deve logar com senha incorreta', () => {
    cy.START()
    cy.submetLoginForm('papito@webdojo.com', 'katana321')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('não Deve logar com mail que não existe', () => {
    cy.START()
    cy.submetLoginForm('papito@webdoja.com', 'katana123')

    cy.contains('button', 'Entrar').click()

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })
})

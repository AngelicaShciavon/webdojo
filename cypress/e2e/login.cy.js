describe('Login', () =>{


   it('deve logar com sucesso', () => {
    cy.acessarAplicacao()
    cy.submeterLogin('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('contain.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('contain.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

 })


 it('não deve logar com credenciais inválidas', () => {
    cy.acessarAplicacao()
    cy.submeterLogin('papito@webdojo.com', 'errada')

    cy.contains('Acesso negado! Tente novamente.')
    .should('be.visible')

 })


  it('não deve logar com mail não cadastrado', () => {
    cy.acessarAplicacao()
    cy.submeterLogin('nao_cadastrado@webdojo.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
    .should('be.visible')

 })
})
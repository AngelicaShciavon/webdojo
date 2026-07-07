describe('Formulário de consultoria', () => {
  it('Deve acessar a tela de consultoria individual', () => {
    cy.START()
    cy.submetLoginForm('papito@webdojo.com', 'katana123')
    cy.goTo('s', 'Consultoria')
  })
})




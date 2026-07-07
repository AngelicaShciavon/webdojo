describe('Formulário de consultoria', () => {
  it('Deve acessar a tela de consultoria individual', () => {
    cy.START()
    cy.submetLoginForm('papito@webdojo.com', 'katana123')
    cy.goTo('s', 'Consultoria')
    cy.get('#name').type('Fernando Papito')
    cy.get('#email').type('papito@teste.com.br')
    cy.get('#phone').type('(00) 0000-0000').should('have.value', '(00) 0000-0000')
    cy.get('#consultancyType').select('inCompany').should('have.value', 'inCompany')
     
  })
})




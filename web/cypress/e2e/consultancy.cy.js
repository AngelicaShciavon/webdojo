describe('Formulario de consultoria', () => {
  it('Deve solicitar consultoria individual', () => {
    cy.START() 
    cy.submetLoginForm('papito@webdojo.com', 'katana123') 

    cy.contains('button', 'S')
      .should('be.visible')
      .click()

    cy.contains('h1', 'Consultoria')
      .should('be.visible')
  })
})

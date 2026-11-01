describe('ifrime', () => {

    it('Deve poder tocar o vidio de exmplo ', () => {
        cy.Login()
        cy.contains('button', 'Video').click()

        cy.get('iframe[title="Video Player"]')
            .should('exist')
            .its('0.contentDocument.body')
            .then(cy.wrap)
            .as('iframePlayer')

        cy.get('@iframePlayer')
            .find('.play-button')
            .click()

        cy.get('@iframePlayer')
            .find('.pause-button')
            .should('be.visible')


    })
})

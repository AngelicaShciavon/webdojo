Cypress.Commands.add('fillConsultancyForm', (form) => {
    cy.get('input[placeholder="Digite seu nome completo"]').type(form.name)
    cy.get('#email').type(form.email)
    cy.get('input[placeholder="(00) 00000-0000"]')
        .type(form.phone)

    cy.contains('label', 'Tipo de Consultoria')
        .parent()
        .find('select')
        .select(form.consultanceType)

    if (form.personType === 'cpf') {
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .check()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('not.be.checked')

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(form.document)
    }

    if (form.personType === 'cnpj') {
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .check()
            .should('be.checked')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('not.be.checked')

        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(form.document)
            .should('have.value', form.document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'))
    }

    form.discoveryChannels.forEach((channel) => {
        cy.contains('label', channel)
            .find('input')
            .check()
            .should('be.checked')
    })

    cy.get('input[type="file"]')
        .selectFile(form.file.replace('cypress/fixtures', Cypress.config('fixturesFolder')), { force: true })

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(form.description)

    form.techs.forEach((tech) => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(tech)
            .type('{enter}')

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', tech)
            .should('be.visible')
    })

    if (form.terms === true) {
        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
    }
})

Cypress.Commands.add('submitConsultancyForm', () => {
    cy.contains('button', 'Enviar formulário')
        .click()
})

Cypress.Commands.add('validateConsultancyModal', () => {
    cy.get('.modal', { timeout: 70000 })
        .should('be.visible')
        .find('.modal-content')
        .should('contain.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
})

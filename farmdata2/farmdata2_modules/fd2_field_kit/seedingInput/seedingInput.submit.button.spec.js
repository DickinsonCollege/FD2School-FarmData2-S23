describe('Test the submit button behavior', () => {

    beforeEach(() => {
        cy.login('manager1', 'farmdata2')
        cy.visit('/farm/fd2-field-kit/seedingInput')
        cy.waitForPage()
    }) 

    it('Test submit button initially disabled', () => {
        cy.get("[data-cy='submit-button']")
            .should("be.disabled")
    })

})
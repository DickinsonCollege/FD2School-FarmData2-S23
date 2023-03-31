describe('Test the labor input section', () => {

    beforeEach(() => {
        cy.login('manager1', 'farmdata2')
        cy.visit('/farm/fd2-field-kit/seedingInput')
    }) 

    it("Check header", () => {
        cy.get("[data-cy='labor-header']")
            .should("have.text", "Labor")
    })
})
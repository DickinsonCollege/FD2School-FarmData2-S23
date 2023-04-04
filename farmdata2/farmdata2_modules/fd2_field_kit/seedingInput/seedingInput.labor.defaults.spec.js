describe('Test the labor input section', () => {

    beforeEach(() => {
        cy.login('manager1', 'farmdata2')
        cy.visit('/farm/fd2-field-kit/seedingInput')
    }) 

    it("Check header", () => {
        cy.get("[data-cy='labor-header']")
            .should("have.text", "Labor")
    })
     it("Checks Worker input test", () => {
        cy.get("[data-cy='num-worker-input'] > [data-cy=text-input]")
            .should('have.value', '')
        cy.get("[data-cy='num-worker-input'] > [data-cy=text-input]")
            .should('have.prop', 'disabled', false)
    })

    it("Checks Time worked input test", () => {
        cy.get("[data-cy='minute-input'] > [data-cy=text-input]")
            .should('have.value', '')
        cy.get("[data-cy='minute-input'] > [data-cy=text-input]")
            .should('have.prop', 'disabled', false)
    })

   
})

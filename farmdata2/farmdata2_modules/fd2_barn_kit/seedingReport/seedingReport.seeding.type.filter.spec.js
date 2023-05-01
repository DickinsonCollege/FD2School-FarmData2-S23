describe('Testing the seeding type filter', () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2_barn_kit/seedingReport")
    })
    it("Tests that direct and tray seedings are both shown when All is selected", () => {
        cy.get('[data-cy=generate-rpt-btn]').click()
        cy.get('[data-cy=crop-dropdown] > [data-cy=dropdown-input]').select('direct seeding').should('have.value', 'direct seeding')
        cy.get('[data-cy=crop-dropdown] > [data-cy=dropdown-input]').should('have.value', 'All')

        it("Checks the direct seeding", () => {
            cy.get('[data-cy=crop-dropdown] > [data-cy=dropdown-input]').select('table seeding').should('table', 'direct seeding')
        })

    })

})



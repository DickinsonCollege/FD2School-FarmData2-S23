describe("Test the seeding report columns by seeding type", () => {
    beforeEach(() => {
        cy.login('manager1', 'farmdata2')
        cy.visit('/farm/fd2-barn-kit/seedingReport')

        // Wait here for the maps to load in the page.
        cy.waitForPage()

        //first generate a report
        cy.get('[data-cy=start-date-select]').type('2020-01-01')
        cy.get('[data-cy=end-date-select]').type('2020-07-01')
        cy.get('[data-cy=generate-rpt-btn]')
            .click()

        cy.waitForPage()
    })

    it("Tests the direct seeding columns", () =>{
        cy.get('[data-cy=seeding-type-dropdown]  > [data-cy=dropdown-input]').select('Direct Seedings')

        cy.get('[data-cy=report-table]')
            .should('exist')

        cy.get('[data-cy=report-table]')
    })

})
describe('Testing the seeding type filter', () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-barn-kit/seedingReport")
    })
    
    it("Tests that direct and tray seedings are both shown when All is selected", () => {
        //Selects date range
        cy.get('[data-cy=start-date-select]').type('2019-02-13')
        cy.get('[data-cy=end-date-select]').type('2019-02-15')
        cy.get('[data-cy=generate-rpt-btn]').click()
        //Direct Seeding and Tray Seeding are shown when ALL is selected
        cy.get('[data-cy=crop-dropdown] > [data-cy=dropdown-input]').should('have.value', 'All')
        cy.get('[data-cy=seeding-type-dropdown] > [data-cy=dropdown-input]').select('Direct Seedings')
        cy.get('[data-cy=direct-summary]').should('exist')
        cy.get('[data-cy=seeding-type-dropdown] > [data-cy=dropdown-input]').select('Tray Seedings')
        cy.get('[data-cy=tray-summary]').should('exist')
    })

    /**
     * The test below will check that when the Direct Seeding option is selected,
     * the seeding report table will contain only the direct seeded crops.
     */
    it("Checks the direct seeding", () => {
        //Select a time range with both direct seeding and tray seeding and generate the report
        cy.get('[data-cy=start-date-select]').type('2019-02-13')
        cy.get('[data-cy=end-date-select]').type('2019-02-15')
        cy.get('[data-cy=generate-rpt-btn]').click()

        //Select only the direct seeding, and tray seeding should not be shown
        cy.get('[data-cy=seeding-type-dropdown] > [data-cy=dropdown-input]').select('Direct Seedings')
        cy.get('[data-cy=tray-summary]').should('not.exist')
    })

    it("Checks the tray seeding", () => {
        //Select a time range with both direct seeding and tray seeding and generate the report
        cy.get('[data-cy=start-date-select]').type('2019-02-13')
        cy.get('[data-cy=end-date-select]').type('2019-02-15')
        cy.get('[data-cy=generate-rpt-btn]').click()
        //Select only the direct seeding, and tray seeding should not be shown
        cy.get('[data-cy=seeding-type-dropdown] > [data-cy=dropdown-input]').select('Tray Seedings')
        cy.get('[data-cy=direct-summary]').should('not.exist')
    })

    it("Tests that only the seeding types shown in the date range are shown in the dropdown", () => {
        //Selects date range
        cy.get('[data-cy=start-date-select]').type('2019-02-13')
        cy.get('[data-cy=end-date-select]').type('2019-02-15')
        cy.get('[data-cy=generate-rpt-btn]').click()
        //Checks whether the dropdown only shows the seeding types in the available data range
        cy.get('[data-cy=seeding-type-dropdown] > [data-cy=dropdown-input]').should('have.value', 'All')
        cy.get('[data-cy=seeding-type-dropdown] > [data-cy=dropdown-input]').children
        cy.get('[data-cy=seeding-type-dropdown]').should('exist')
        cy.get('[data-cy=seeding-type-dropdown] > [data-cy=dropdown-input]').select('Area')
        cy.get('[data-cy=area-dropdown]').should('exist')
    })

})




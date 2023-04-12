/**
 * The crop dropdown in the Seeding Report allows the user to filter the crops that appear 
 * in the generated table. This spec tests that when the table is generated that if the 
 * option "All" is selected that multiple crops will be allowed to appear in the table 
 * and that when one of the crop options is selected then only that crop will appear in 
 * the table. This spec will also test that only the crops that appear in the selected date 
 * range, and "All", will be options in the crop dropdown.
 */
describe("Test that the crop filter in the Seeding Report works as intended", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-barn-kit/seedingReport")
        cy.waitForPage()
    })

    it("Tests that the dropdown for the crop filter only contains the crops that exist in the given date range", () => {
        cy.get('[data-cy=start-date-select]').type('2020-03-01')
        cy.get('[data-cy=end-date-select]').type('2020-03-07')
        cy.get('[data-cy=generate-rpt-btn]').click()

        cy.get('[data-cy=crop-dropdown] > [data-cy=dropdown-input]')
            .children()
            .should("have.length", 5)//There should be five options: the four crops in this date range and the "All" option.

        cy.get('[data-cy=crop-dropdown] > [data-cy=dropdown-input]')
            .children()
            .first()
            .should('have.value', 'All')

        cy.get('[data-cy=crop-dropdown] > [data-cy=dropdown-input]')
            .children().next()
            .should('have.value', 'BOKCHOY')

        cy.get('[data-cy=crop-dropdown] > [data-cy=dropdown-input]')
            .children()
            .last()
            .should('have.value', 'RADISH')
    })

    it("Tests that when 'All' crops are selected, the table will have seeding logs for several crops", () => {
        //Check date range 03/01/2020 - 03/07/2020
        cy.get('[data-cy=start-date-select]').type('2020-03-01')
        cy.get('[data-cy=end-date-select]').type('2020-03-07')
        cy.get('[data-cy=generate-rpt-btn]').click()

        //Check to ensure All is selected in the dropdown
        cy.get('[data-cy=crop-dropdown] > [data-cy=dropdown-input]').should('have.value', 'All')

        //Check that several crops have logs in the table when All is selected
        cy.get('[data-cy=report-table]').contains('td', 'ENDIVE')
        cy.get('[data-cy=report-table]').contains('td', 'RADICCHIO')
        cy.get('[data-cy=report-table]').contains('td', 'BOKCHOY')
        cy.get('[data-cy=report-table]').contains('td', 'RADISH')
    })

    it("Tests that when a specific crop is selected, the table will have only the seeding logs for that crop", () => {
        //Check date range 03/01/2020 - 09/30/2020
        cy.get('[data-cy=start-date-select]').type('2020-03-01')
        cy.get('[data-cy=end-date-select]').type('2020-09-30')
        cy.get('[data-cy=generate-rpt-btn]').click()

        //Selecting PEPPERS-HOT in the crops dropdown menu
        cy.get('[data-cy=crop-dropdown] > [data-cy=dropdown-input]').select('PEPPERS-HOT')
        //checking to ensure PEPPERS-HOT is selected in the dropdown menu
        cy.get('[data-cy=crop-dropdown] > [data-cy=dropdown-input]').should('have.value', 'PEPPERS-HOT')
        //Check that only logs pertaining to PEPPERS-HOT exist in the table
        cy.get('[data-cy=report-table]').each((tableLog) => {
            cy.wrap(tableLog).contains('td', "PEPPERS-HOT")
        })

        //Selecting WATERMELON in the crops dropdown menu
        cy.get('[data-cy=crop-dropdown] > [data-cy=dropdown-input]').select('WATERMELON')
        //checking to ensure WATERMELON is selected in the dropdown menu
        cy.get('[data-cy=crop-dropdown] > [data-cy=dropdown-input]').should('have.value', 'WATERMELON')
        //Check that only logs pertaining to WATERMELON exist in the table
        cy.get('[data-cy=report-table]').each((tableLog) => {
            cy.wrap(tableLog).contains('td', "WATERMELON")
        })

        //Selecting BEET in the crops dropdown menu
        cy.get('[data-cy=crop-dropdown] > [data-cy=dropdown-input]').select('BEET')
        //checking to ensure BEET is selected in the dropdown menu
        cy.get('[data-cy=crop-dropdown] > [data-cy=dropdown-input]').should('have.value', 'BEET')
        //Check that only logs pertaining to BEET exist in the table
        cy.get('[data-cy=report-table]').each((tableLog) => {
            cy.wrap(tableLog).contains('td', "BEET")
        })

    })
})
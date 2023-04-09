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

})
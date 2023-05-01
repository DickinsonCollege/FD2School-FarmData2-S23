describe('Tests for SeedingInput log creation', () => {

    beforeEach(() => {
      cy.login('manager1', 'farmdata2')
      cy.visit('/farm/fd2-barn-kit/seedingReport')
    })

    it("Checks if the “Cancel” button (the brown X) discards any edits and does not change the database.", () => {
        cy.get('[data-cy=start-date-select]')
            .type('2019-02-04')
        cy.get('[data-cy=end-date-select]')
            .type('2019-02-04')
        cy.get('[data-cy=generate-rpt-btn')
            .click()
    })

})
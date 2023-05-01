describe('Tests for SeedingInput log creation', () => {

    beforeEach(() => {
      cy.login('manager1', 'farmdata2')
      cy.visit('/farm/fd2-barn-kit/seedingReport')
    })

    it("Checks all of the input elements in the form remain populated with their existing values in tray seeding", () => {
        cy.get('[data-cy=start-date-select]')
            .type('2020-05-01')

    })

})
describe("Test the harvest report default values", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-field-kit/seedingInput")
    })
      
    it("Tests whether Tray and Direct elements are enabled", () => {
        cy.get("[data-cy='tray-seedings']").should('be.enabled')
        cy.get("[data-cy='direct-seedings']").should('be.enabled')
    })

    it("Tests that neither the Tray nor the Direct element is selected", () => {
        cy.get("[data-cy='tray-seedings']").should('not.be.selected')
        cy.get("[data-cy='direct-seedings']").should('not.be.selected')
    })

    it("Tests that the message indicating that the Tray or Direct element must be selected is visible", () => {
        cy.get("[data-cy='message-to-prompt-selection']").should('be.visible')
    })

    it("Tests that the form elements for Tray or Direct are not visible until clicked", () => {
        //check form elements in tray seeding - should not be visible until tray radio button clicked
        cy.get("[data-cy='tray-area-selection']").should('not.be.visible')
        cy.get("[data-cy='num-cell-input']").should('not.be.visible')
        cy.get("[data-cy='num-tray-input']").should('not.be.visible')
        cy.get("[data-cy='num-seed-input']").should('not.be.visible')
        ///check form elements in direct seeding - should not be visible until direct radio button clicked
        cy.get("[data-cy='direct-area-selection']").should('not.be.visible')
        cy.get("[data-cy='num-rowbed-input']").should('not.be.visible')
        cy.get("[data-cy='num-feet-input']").should('not.be.visible')
    })
})

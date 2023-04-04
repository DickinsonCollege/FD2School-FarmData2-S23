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

    
})

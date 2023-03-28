describe("Test the harvest report Generations", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/FD2")
       
    })
      
    it("Check the harvest report generated", () => {
        cy.get("[data-cy=report-title]").should('not.exist')
        cy.get("[data-cy=generate-report-button]").click()
        cy.get("[data-cy=report-title]").should('be.visible')
       
    })

    it("Check the harvest report generated details", () => {
        cy.get("[data-cy=generate-report-button]").click()
        cy.get("[data-cy=farm]").should('have.text', 'Farm: Sample Farm')
        cy.get("[data-cy=username]").should('contain.text', 'manager1')
        cy.get("[data-cy=language]").should('have.text', 'English')
       
    })
    
})
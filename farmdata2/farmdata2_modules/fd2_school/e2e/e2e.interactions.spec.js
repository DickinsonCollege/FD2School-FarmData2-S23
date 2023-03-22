describe("Test user interactions in the harvest report", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })
      
    it("Test button to generate report", () => {
        cy.get("[data-cy=generate-report-button]").click()

        cy.get("[data-cy=harvest-report-title]")
            .should("be.visible")
    })

})

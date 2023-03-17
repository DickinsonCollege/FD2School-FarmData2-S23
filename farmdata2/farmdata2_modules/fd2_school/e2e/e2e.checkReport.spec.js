describe("Test values once generate report button clicked", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })
      
    it("Check that the report title does not exist at first", () => {
        cy.get("[data-cy=report-title]")
          .should("not.exist")
    })

    it("Check that the report title appears once report generated", () => {
        cy.get("[data-cy=generate-report-button]").click()
        cy.get("[data-cy=report-title]")
          .should("be.visible")
    })
})
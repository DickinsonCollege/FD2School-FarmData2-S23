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

    it("Check that report information is valid", () => {
        cy.get("[data-cy=generate-report-button]").click()
        cy.get("[data-cy=farm-name]")
          .should("contains.text", "Sample Farm")
        cy.get("[data-cy=username]")
          .should("contains.text", "manager1")
        cy.get("[data-cy=language]")
          .should("contains.text", "English")
        //all of my values for these three info points
        //had \n's so I used contains.text to check them instead.
    })
})
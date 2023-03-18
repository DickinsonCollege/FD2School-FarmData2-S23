describe("Test the generation of the harvest report", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/fd2")
    })
      
    it("Check that button generates the report", () => {
        cy.get("[data-cy=report-header]").should("not.exist")
        cy.get("[data-cy=generate-report-button]").click()
        cy.get("[data-cy=report-header]").should("be.visible")
    })

    it("Check that details are correct when report is generated", () => {
        cy.get("[data-cy=generate-report-button]").click()
        cy.get("[data-cy=farm-name]").should("have.text", "Farm: Sample Farm")
        cy.get("[data-cy=username]").should("contain.text", "manager1")
        cy.get("[data-cy=language]").should("have.text", "English")
    })
})
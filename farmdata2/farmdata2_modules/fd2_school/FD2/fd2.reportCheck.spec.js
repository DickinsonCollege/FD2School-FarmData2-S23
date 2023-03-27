describe("Check Harvest Report when the generate button is clicked", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/fd2")
    })
    it("Details should be not visible", () => {
        cy.get("[data-cy = report-header]").should("not.exist")
    })
    it("Get Generate Report button", () => {
        cy.get("[data-cy = generate-report-button]").click()
        cy.get("[data-cy = report-header]").should("be.visible")
        cy.get("[data-cy = farm-name]").should("have.text", "Farm: Sample Farm")
        cy.get("[data-cy = farm-user]").should("contain.text", "manager1")
        cy.get("[data-cy = farm-language]").should("have.text", "English")
    })

})
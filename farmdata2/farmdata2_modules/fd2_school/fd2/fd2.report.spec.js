describe("Test the generated harvest report", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })

    it("Check report title", () => {
        cy.get("[data-cy=report-title]")
            .should("not.exist")

        cy.get("[data-cy=generate-report-button]")
            .click()

        cy.get("[data-cy=report-title]")
            .should("be.visible")
    })
      
    it("Check report details", () => {
        cy.get("[data-cy=generate-report-button]")
            .click()

        cy.get("[data-cy=farm-name]")
            .should("have.text", "Farm:Sample Farm")

        cy.get("[data-cy=username]")
            .should("contain.text", "manager1")

        cy.get("[data-cy=language")
            .should("have.text", "English")

    })
 
})
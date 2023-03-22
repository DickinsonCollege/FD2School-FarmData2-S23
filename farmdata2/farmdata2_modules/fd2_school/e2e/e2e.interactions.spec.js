describe("Test user interactions in the harvest report", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })

    it("Test button to generate report", () => {
        cy.get("[data-cy=harvest-report-title]")
            .should("not.exist")

        cy.get("[data-cy=generate-report-button]").click()

        cy.get("[data-cy=harvest-report-title]")
            .should("be.visible")
    })

    it("Test button to generate report", () => {
        cy.get("[data-cy=farm-name]")
            .should("not.exist")

        cy.get("[data-cy=user-name]")
            .should("not.exist")

        cy.get("[data-cy=language]")
            .should("not.exist")

        cy.get("[data-cy=generate-report-button]").click()

        cy.get("[data-cy=farm-name]")
            .should("have.text", "Farm:Sample Farm")

        cy.get("[data-cy=user-name]")
            .should("contain.text", "manager1")

        cy.get("[data-cy=language]")
            .should("have.text", "English")
    })

})

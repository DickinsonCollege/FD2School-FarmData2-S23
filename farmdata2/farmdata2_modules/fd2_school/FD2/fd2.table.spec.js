describe("Check if the custom-table is displaying right", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/fd2")
    })
    it("Details should be not visible", () => {
        cy.get("[data-cy = reportTable]").should("not.exist")
    })
})
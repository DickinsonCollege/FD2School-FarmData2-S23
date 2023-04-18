describe("Test the harvest report default values", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })
    it("Test the page header", () => {
        cy.get("[data-cy=page-header]")
        .should("have.text","Harvest Report")
    })
    it("Test default start date and end date", () => {
        cy.get("[data-cy=start-date]")
        .should("have.value", "2020-05-05")
        cy.get("[data-cy=end-date")
        .should("have.value", "2020-05-15")
    })
    it("Test the crop list", () => {
        cy.get("[data-cy=crop-list]").children().eq(0)
        .should("have.text", "ARUGULA")
        cy.get("[data-cy=crop-list]").children().eq(4)
        .should("have.text", "BEAN-FAVA")
        cy.get("[data-cy=crop-list]").children().eq(110)
        .should("have.text", "ZUCCHINI")
        cy.get("[data-cy=crop-list]").children()
        .should("have.length", 111)
    })
})

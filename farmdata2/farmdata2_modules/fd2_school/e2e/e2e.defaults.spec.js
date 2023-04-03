describe("Test the harvest report default values", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })
      
    it("Check the page header", () => {
        cy.get("[data-cy=page-header]")
            .should("have.text", "Harvest Report")
    })

    it("Check if start and end dates are correct", () => {
        cy.get("[data-cy=Start-date]")
            .should("have.value", "2020-05-05")
        cy.get("[data-cy=End-date]")
            .should("have.value", "2020-05-15")
    })

    it("check if crop select is correct", () => {
        cy.get("[data-cy=crop-select]").children().eq(0)
            .should("have.value", "ARUGULA")
        cy.get("[data-cy=crop-select]").children().eq(4)
            .should("have.value", "BEAN-FAVA")
        cy.get("[data-cy=crop-select]").children().eq(110)  
            .should("have.value", "ZUCCHINI")
        cy.get("[data-cy=crop-select]").children()
            .should("have.length", 111)
    })
})
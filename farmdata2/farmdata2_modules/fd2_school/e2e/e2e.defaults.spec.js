describe("Test the harvest report default values", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })
      
    it("Check the page header", () => {
        cy.get("[data-cy=page-header]")
            .should("have.text","Harvest Report")
    })

    it("Check if start and end dates are correct", () => {
        cy.get("[data-cy=Start-date]")
            .should("have.value", "2020-05-05")
        cy.get("[data-cy=End-date]")
            .should("have.value", "2020-05-15")
    })
})

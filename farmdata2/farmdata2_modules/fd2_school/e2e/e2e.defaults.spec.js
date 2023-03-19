describe("Test the harvest report default values", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
        cy.get("[data-cy=page-header]")
        .should("have.text"," Harvest Report")

    })
      
    it("Check the page header", () => {
    
    })
    it("Check the start date and end date", () => {
        cy.get("[data-cy=start-date]").should("have.value","2020-05-05")
        cy.get("[data-cy=end-date]").should("have.value","2020-05-15")
    })

})

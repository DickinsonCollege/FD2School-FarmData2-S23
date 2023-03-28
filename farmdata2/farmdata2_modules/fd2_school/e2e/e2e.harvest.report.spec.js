describe("Test the Harvest Report Generation", () => {

    beforeEach(() =>{
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })
    it("Checks generate report button", () =>{
        cy.get("[data-cy=report-header]").should("not.exist")
        cy.get("[data-cy=generate-report]").click()
        cy.get("[data-cy=report-header]").should("be.visible")
    })
    it("Checks the Harvest Report Details", () => {
        cy.get("[data-cy=generate-report]").click()
        cy.get("[data-cy=farm-li]").should("have.text", "Farm: Sample Farm")
        cy.get("[data-cy=user-li]").should("contain.text", "manager1")
        cy.get("[data-cy=language-li]").should("have.text","English")
    })
    
})
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

})
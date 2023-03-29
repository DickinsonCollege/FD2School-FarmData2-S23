describe("Test the harvest report generate report button", () => { 
    beforeEach(() => { 
        cy.login("manager1", "farmdata2") 
        cy.visit("/farm/fd2-school/e2e") 
    }) 

    it("Check the page header", () => { 
        cy.get("[data-cy=report-header]")
        .should("not.exist")
        cy.get("[data-cy=generate-report]").click()
        cy.get("[data-cy=report-header]")
        .should("be.visible")
    }) 

}) 
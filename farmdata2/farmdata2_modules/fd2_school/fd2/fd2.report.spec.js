describe("Test the generate report function", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
        

    })
      
    it("Check the report title which does  not exist ", () => {
    
        cy.get("[data-cy=tittleReport]").should("not.exist")
    })
    it("Check the generate report button ", () => {
    
        cy.get("[data-cy=generate-report-button]").click()
    })

    it("Check the report title which  exist ", () => {
        cy.get("[data-cy=generate-report-button]").click()
        cy.get("[data-cy=tittleReport]").should("be.visible")
        cy.get("[data-cy=user]").should("contain.text","worker1")
    
        cy.get("[data-cy=language]").should("have.text","English")
    })
    

})

describe("Test the harvest report User Inputs", () => {
    
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })
  
    it("Check the Generate Report Button", () =>{ 
        cy.get("[data-cy=report-header]")
            .should("not.exist")
        cy.get("[data-cy=generate-report-button]").click()
    })

    it("Check generate button - farm info",()=>{
        
        cy.get("[data-cy=generate-button]").click()
        cy.get("[data-cy=farm-name]")
            .should("have.text","Sample Farm")
        cy.get("[data-cy=farm-user]")
            .should("have.text","manager1")
        cy.get("[data-cy=farm-language]")
            .should("have.text","English")
    })
})
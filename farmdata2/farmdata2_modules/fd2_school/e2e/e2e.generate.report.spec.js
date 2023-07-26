describe("Test the harvest report User Inputs", () => {
    
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })
  
    it("Check generate button - harvest report title",()=>{
        cy.get("[data-cy=report-header]")
            .should("not.exist")
        cy.get("[data-cy=generate-report-button]").click()
        cy.get("[data-cy=report-header]")
            .should("be.visible")
    })

    it("Check generate button - farm info",()=>{
        
        cy.get("[data-cy=generate-report-button]").click()
        cy.get("[data-cy=farm-name]")
            .should("have.text"," Sample Farm")
        cy.get("[data-cy=user-name]")
            .should("have.text"," manager1")
        cy.get("[data-cy=language]")
            .should("have.text"," English")
    })
})
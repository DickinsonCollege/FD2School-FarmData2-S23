describe("Test the Generate Button", ()=>{
    beforeEach(()=>{
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })

    it("Check generate button - harvest report title",()=>{
        cy.get("[data-cy=generate-title]").should("not.exist")
        cy.get("[data-cy=generate-button]").click()
        cy.get("[data-cy=generate-title]").should("be.visible")
    })

    it("Check generate button - farm info",()=>{
        
        cy.get("[data-cy=generate-button]").click()
        cy.get("[data-cy=farm-name]").should("have.text","Sample Farm")
        cy.get("[data-cy=farm-user]").should("have.text","manager1")
        cy.get("[data-cy=farm-language]").should("have.text","English")
    })

})
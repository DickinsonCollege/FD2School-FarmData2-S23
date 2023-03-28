describe("Test the generate button", () =>{
    beforeEach(()=>{
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e/e2e.html")
        
    })

    it("Check the generate button work",() =>{
        cy.get("[data-cy=report-title]").should("not.exist")
        cy.get("[data-cy=generate-button]").click()
        cy.get("[data-cy=report-title]").should("be.visible")
    })

    it("Check the farm's name", ()=>{
        cy.get("[data-cy=generate-button]").click()
        cy.get("[data-cy=farm-name]").should("have.text", "Sample Farm")
    })
})
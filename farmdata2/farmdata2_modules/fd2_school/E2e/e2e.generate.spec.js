describe("Test the Generate Button", ()=>{
    beforeEach(()=>{
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })

    it("Check generate button",()=>{
        cy.get("[data-cy=generate-title]").should("not.exist")
        cy.get("[data-cy=generate-button]").click()
        cy.get("[data-cy=generate-title]").should("be.visible")
    })
})
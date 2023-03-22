describe("Test the Harvest Report Generation", () => {

    beforeEach(() =>{
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })
    it("Does nothing much", () =>{
        cy.get("[generate-harvest-report]").click()
    })

})
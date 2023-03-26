describe("Test the harvest report default values", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/fd2")
        

    })
      
    it("Check the table header", () => {
        cy.get("[data-cy=generate-report-button]").click()
        cy.get("[data-cy=h0]")
        .should("have.text","Date")
        cy.get("[data-cy=h1]")
        .should("have.text","Area")
        cy.get("[data-cy=h2]")
        .should("have.text","Crop")
        cy.get("[data-cy=h3]")
        .should("have.text","yield")
        cy.get("[data-cy=h4]")
        .should("have.text","unit")
        cy.get("[data-cy=r0]")
        .children().should("have.length","6")
        

    
    })
    it("check filter crop",()=>{

        cy.get ("[data-cy=crop-dropdown] > [data-cy=dropdown-input] ").select("BEAN-DRY")
        cy.get("[data-cy=generate-report-button]").click()
         cy.get ("[data-cy=table]").children().should("have.length","2")
    })
    

    

})

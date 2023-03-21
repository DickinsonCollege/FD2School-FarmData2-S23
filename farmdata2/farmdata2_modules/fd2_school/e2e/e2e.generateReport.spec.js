describe("Test the Generate Report Button", () => { 
  beforeEach(() => { 
      cy.login("manager1", "farmdata2") 
      cy.visit("/farm/fd2-school/e2e") 
    
  }) 

  it("Check Generate Report before generated", () => {      
    cy.get("[data-cy=report-title]").should("not.exist")
  }) 

  it("Check Generate Report after generated", () => {      
      cy.get("[data-cy=generate-report-button]").click()
      cy.get("[data-cy=report-title]").should("be.visible")
  }) 
})
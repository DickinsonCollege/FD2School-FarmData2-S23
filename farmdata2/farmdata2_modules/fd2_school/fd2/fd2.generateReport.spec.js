describe("Test the Generate Report Button", () => { 
  beforeEach(() => { 
      cy.login("manager1", "farmdata2") 
      cy.visit("/farm/fd2-school/FD2") 
    
  }) 

  it("Check Generate Report before generated", () => {      
    cy.get("[data-cy=report-title]").should("not.exist")
  }) 

  it("Check Generate Report after generated", () => {      
      cy.get("[data-cy=generate-report-button]").click()
      cy.get("[data-cy=report-title]").should("be.visible")
  }) 

  it("Check Farm name after generated", () => {      
    cy.get("[data-cy=generate-report-button]").click()
    cy.get("[data-cy=farm-name]").should("contain.text", "Sample FarmName")
  })

  it("Check Language after generated", () => {      
    cy.get("[data-cy=generate-report-button]").click()
    cy.get("[data-cy=language]").should("have.text", "Language:English")
  })

  it("Check UserID after generated", () => {      
    cy.get("[data-cy=generate-report-button]").click()
    cy.get("[data-cy=user-id]").should("have.text", "User:manager1")
  })
})
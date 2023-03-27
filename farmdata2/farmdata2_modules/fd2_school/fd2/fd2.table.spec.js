describe("Test contents of harvest report table", () => {
  beforeEach(() => {
      cy.login("manager1", "farmdata2")
      cy.visit("/farm/fd2-school/FD2")
  })

  it("Test that all column headers are correct", () => {
    cy.get("[data-cy=generate-report-button]").click()
    cy.get("[data-cy=h0]").should("have.text","ID")
    cy.get("[data-cy=h1]").should("have.text","Date")
    cy.get("[data-cy=h2]").should("have.text","Area")
    cy.get("[data-cy=h3]").should("have.text","Crop")
    cy.get("[data-cy=h4]").should("have.text","Yield")
    cy.get("[data-cy=h5]").should("have.text","Unit")
  })

  it("Tests for correct number of columns", () => {
    cy.get("[data-cy=generate-report-button]").click()
    cy.get("[data-cy=table-headers]").children().should("have.length", 6)
  })

  it("Test for crop filtering", () => {
    cy.get("[data-cy=crop-selected] > [data-cy=dropdown-input]").select("ASPARAGUS")
    cy.get("[data-cy=generate-report-button]").click()
    
    let len = 5
    cy.get("[data-cy=table-body]").children().should("have.length", len)
    for (let i = 0; i < len; i++) {
        cy.get("[data-cy=r"+i+"-Crop]").should("have.text", "ASPARAGUS")
    }
})
})
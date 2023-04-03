describe("Test the harvest report dynamic values", () => {
  beforeEach(() => {
      cy.login("manager1", "farmdata2")
      cy.visit("/farm/fd2-school/fd2")
      cy.get("[data-cy=generate-report-button]").click()
  })
    
  it("Check the table headers", () => {
    cy.get("[data-cy=h0]").should("have.text","Date")
    cy.get("[data-cy=h1]").should("have.text","Area")
    cy.get("[data-cy=h2]").should("have.text","Crop")
    cy.get("[data-cy=h3]").should("have.text","Yield")
    cy.get("[data-cy=h4]").should("have.text","Units")

    cy.get("[data-cy=table-headers]").children().should("have.length", "6")
  })

  it("Check table filtering", () => {
    cy.get("[data-cy=crop-drop-down] > [data-cy=dropdown-input]").select("ARUGULA")
    cy.get("[data-cy=table] > [data-cy=table-body]").children().should("have.length", "4")
    cy.get("[data-cy=table] > [data-cy=table-body] > [data-cy=r1] > [data-cy=td-r1c0]").should("have.text", "12/05/2020     ")
    cy.get("[data-cy=table] > [data-cy=table-body] > [data-cy=r1] > [data-cy=td-r1c1]").should("have.text", "GHANA-4     ")
    cy.get("[data-cy=table] > [data-cy=table-body] > [data-cy=r1] > [data-cy=td-r1c2]").should("have.text", "ARUGULA     ")
    cy.get("[data-cy=table] > [data-cy=table-body] > [data-cy=r1] > [data-cy=td-r1c3]").should("have.text", "7     ")
    cy.get("[data-cy=table] > [data-cy=table-body] > [data-cy=r1] > [data-cy=td-r1c4]").should("have.text", "POUND     ")

    cy.get("[data-cy=table] > [data-cy=table-body] > [data-cy=r0] > [data-cy=td-r0c2]").should("have.text", "ARUGULA     ")
    cy.get("[data-cy=table] > [data-cy=table-body] > [data-cy=r2] > [data-cy=td-r2c2]").should("have.text", "ARUGULA     ")
    cy.get("[data-cy=table] > [data-cy=table-body] > [data-cy=r3] > [data-cy=td-r3c2]").should("have.text", "ARUGULA     ")
  })

  //"[data-cy=table] > [data-cy=rows] > [data-cy=td-r2c1]").should("have.text","CHUAU-2"
})
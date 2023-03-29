describe("Test report table", () => {
  beforeEach(() => {
      cy.login("manager1", "farmdata2")
      cy.visit("/farm/fd2-school/FD2")
  })

  it("Test all column headers", () => {
    cy.get("[data-cy=generate-report-button]").click()
    cy.get("[data-cy=h0]").should("have.text","ID")
    cy.get("[data-cy=h1]").should("have.text","Date")
    cy.get("[data-cy=h2]").should("have.text","Area")
    cy.get("[data-cy=h3]").should("have.text","Crop")
    cy.get("[data-cy=h4]").should("have.text","Yield")
    cy.get("[data-cy=h5]").should("have.text","Unit")
})

it("Test number of columns", () => {
  cy.get("[data-cy=generate-report-button]").click()
  cy.get("[data-cy=table-headers]").children().should("have.length", 6)
})

})
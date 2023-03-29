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

it("Test the crop filtering functionality", () => {
  cy.get("[data-cy=crop-dropdown] > [data-cy=dropdown-input]").select("BOKCHOY")
  cy.get("[data-cy=generate-report-button]").click()
  let len = 3
  cy.get("[data-cy=table-body]").children().should("have.length", len)
  for (let i = 0; i < len; i++) {
      cy.get("[data-cy=r"+i+"-Crop]").should("have.text", "BOKCHOY")
  }
})

})
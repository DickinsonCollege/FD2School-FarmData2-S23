describe("Test the harvest report default values", () => {
  beforeEach(() => {
    cy.login("manager1","farmdata2")
    cy.visit("/farm/fd2-school/e2e")
  })
  it("Check the page header", () =>{
    cy.get("[data-cy=page-header]").should("have.text", "Harvest Report")
  })
  it("Check the default start and end dates", () =>{
    cy.get("[data-cy=start-date").should("have.value","2020-05-05")
    cy.get("[data-cy=end-date").should("have.value","2020-05-05")
  })
})
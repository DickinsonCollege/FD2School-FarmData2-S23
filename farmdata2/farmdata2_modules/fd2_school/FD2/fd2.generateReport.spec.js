describe("Test the generate button in the harvest report", () => {
  beforeEach(() => {
    cy.login("manager1","farmdata2")
    cy.visit("/farm/fd2-school/e2e")
  })
  it("Check the generated report", () =>{
    cy.get("[data-cy=page-header]").should("not.exist")
    cy.get("[data-cy=generate-report-button]").click()
    cy.get("[data-cy=report-header]").should("be.visible")
  })
  it("Check the report details", () =>{
    cy.get("[data-cy=generate-report-button]").click()
    cy.get("[data-cy=farm]").should("have.text", "Farm: Sample Farm")
    cy.get("[data-cy=user]").should("have.text", "User: manager1")
    cy.get("[data-cy=language]").should("have.text", "Language: English")
  })
})
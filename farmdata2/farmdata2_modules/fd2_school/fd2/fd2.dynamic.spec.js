describe("Test the harvest report dynamic values", () => {
  beforeEach(() => {
      cy.login("manager1", "farmdata2")
      cy.visit("/farm/fd2-school/fd2")
  })
    
  it("Check the generate report button", () => {
    cy.get("[data-cy=report-title]").should("not.exist")
    cy.get("[data-cy=generate-report-button]").click()
    cy.get("[data-cy=report-title]").should("be.visible")

  })

  it("Check the generate report button values", () => {
    cy.get("[data-cy=report-farm]").should("not.exist")
    cy.get("[data-cy=generate-report-button]").click()
    cy.get("[data-cy=report-farm]").should("have.text", "Farm:Sample Farm")

    cy.get("[data-cy=report-user]").should("contain.text", "User:")
    cy.get("[data-cy=report-language]").should("have.text", "English")
  })
})
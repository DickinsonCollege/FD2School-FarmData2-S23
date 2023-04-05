describe('Test the harvest report generated values', () => {
  beforeEach(() => {
    cy.login("manager1", "farmdata2")
    cy.visit("/farm/fd2-school/fd2")
})
  it("Check the generate report button", ()=> {
    cy.get('[data-cy=title]')
      .should("not.exist")
    cy.get('[data-cy=generate-report]')
      .click()
    cy.get('[data-cy=title]')
      .should("be.visible")
  })
  it("Check the generate report button values", () => {
    cy.get("[data-cy=farm]").should("not.exist")
    cy.get("[data-cy=generate-report]").click()
    cy.get("[data-cy=farm]").should("have.text", "Farm:Sample Farm")
    cy.get("[data-cy=user]").should("contain.text", "User:")
    cy.get("[data-cy=language]").should("have.text", "English")
  })
})
describe("Test the generated harvest report", () => {
  beforeEach(() => {
      cy.login("manager1", "farmdata2")
      cy.visit("/farm/fd2-school/e2e")
  })

  it("Check harvest report", () => {
      cy.get("[data-cy=report-title]")
          .should("not.exist")

      cy.get("[data-cy=generate-report-button]")
          .click()

      cy.get("[data-cy=report-title]")
          .should("be.visible")
  })
  
  it("Check details in report", () => {
    cy.get("[data-cy=generate-report-button]")
        .click()

    cy.get("[data-cy=farm-name]")
        .should("have.text", "Farm: Sample Farm")

    cy.get("[data-cy=username]")
        .should("contain.text", "manager1")

    cy.get("[data-cy=language")
        .should("have.text", "Language: English ")

})
})
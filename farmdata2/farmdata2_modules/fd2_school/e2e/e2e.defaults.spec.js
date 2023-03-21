describe("Test the harvest report default values", () => {
  beforeEach(() => {
      cy.login("manager1", "farmdata2")
      cy.visit("/farm/fd2-school/e2e")
  })
    
  it("Check the page header", () => {
    cy.get("[data-cy=page-header]")
      .should("have.text", "Harvest Report")
  })

  it("checks default start and end dates for harvest report", () => {
    cy.get('[data-cy="start-date"]')
      .should('have.value', '2020-05-05')
    cy.get('[data-cy="end-date"]')
      .should('have.value', '2020-05-15')
  })

  it("checks that crop dropdown is correctly working", () => {
    cy.get('[data-cy="crop-selected"]')
      .children()
      .eq(0)
      .should("have.text", "ARUGULA")

    cy.get('[data-cy="crop-selected"]')
      .children()
      .eq(4)
      .should("have.text", "BEAN-FAVA")

    cy.get('[data-cy="crop-selected"]')
      .children()
      .eq(110)
      .should("have.text", "ZUCCHINI")

    cy.get('[data-cy="crop-selected"]')
      .children()
      .should("have.length", 111)
  })
})



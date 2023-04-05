describe('eTest Seeding Report Default', () => {
  beforeEach(()=> {
    cy.login("manager1", "farmdata2")
    cy.visit("/farm/fd2_barn_kit/seedingReport")
  })
  
  // it("Test the default start date and end date", ()=>{
  //   cy.get("[data-cy=date-range-selection]").click()
  //   cy.get("[data-cy=date-range-selection]").should('have.value','2023-01-01')
  //   cy.get("[data-cy=date-range-selection]").should('have.value','2023-04-05')
  // })

  // it("Test the generate button", () => {
  //   cy.get("[data-cy=generate-rpt-btn]").click()
  //   cy.get("[data-cy=farm]").should("have.text", "Set Dates")
  // })
})
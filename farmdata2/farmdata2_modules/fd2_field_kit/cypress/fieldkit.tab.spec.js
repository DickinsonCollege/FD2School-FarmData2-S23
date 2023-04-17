describe('Test for FieldKit Sub-Tabs', () => {

  beforeEach(() => {
    cy.login('manager1', 'farmdata2')
    cy.visit('/farm/fd2-field-kit')
  })

  //issue #200, sub-task 1
  it('Verify that FieldKit tab contains sub-tabs for "Info" and "Seeding Input"', () =>{
    cy.get('.pagination-sm').contains('Info').should('exist')
    cy.get('.pagination-sm').contains('Seeding Input').should('exist')
  })

})
describe('my first test', () => {
  it('visits the kitchen sink', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()


    //the page should contain this URL
    cy.url().should('include', '/commands/actions')

    //get an input and type this phrase into it
    cy.get('.action-email').type('fake@gmail.com')

    //verify the field was updated
    cy.get('.action-email').should('have.value', 'fake@gmail.com')
  })
})
describe("Test if the window appears if Direct is selected", () => {

  beforeEach(() => {
    cy.login('manager1', 'farmdata2')

    // Cypress clears the local storage between each test.  
    // So we need to save it at the end of each test (see afterEach)
    // and then restore beore each test (here). 
    cy.restoreLocalStorage()
    cy.visit('/farm/fd2-field-kit/seedingInput')
  })

  it('should display the Direct Seeding section when Direct is selected', () => {
    cy.get('[data-cy=direct-seedings]').check();
    cy.get('[data-cy=num-rowbed-input]').should('be.visible');
    cy.get('[data-cy=unit-feet]').should('be.visible');
    cy.get('[data-cy=num-feet-input]').should('be.visible');
  });

})
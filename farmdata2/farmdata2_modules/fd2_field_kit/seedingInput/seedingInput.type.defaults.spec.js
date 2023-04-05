describe("Tests for seeding input", () => {

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

  //issue 159 sub-task 6
  it('should display dropdown for units that is enabled', () => {
    cy.get('[data-cy=direct-seedings]')
      .click()
      .then(() => {
        cy.get('[data-cy=unit-feet] > [data-cy=dropdown-input]')
          .children() 
          .first()
          .should('have.value', 'Bed Feet')
        cy.get('[data-cy=unit-feet] > [data-cy=dropdown-input]')
          .children() 
          .last()  
          .should('have.value', 'Row Feet')
        cy.get('[data-cy=unit-feet] > [data-cy=dropdown-input]')
          .children() 
          .should('have.length', 2)
      })
  })

  
})
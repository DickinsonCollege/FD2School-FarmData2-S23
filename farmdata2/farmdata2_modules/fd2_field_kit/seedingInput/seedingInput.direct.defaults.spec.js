describe("Tests for seeding input", () => {

  beforeEach(() => {
    cy.login('manager1', 'farmdata2')
    cy.visit('/farm/fd2-field-kit/seedingInput')
  })

  //sub-task #1 issue 159
  it('should display the Direct Seeding section when Direct is selected', () => {
    cy.get('[data-cy=direct-seedings]').check();
    cy.get('[data-cy=direct-area-selection]').should('be.visible');
    cy.get('[data-cy=num-rowbed-input]').should('be.visible');
    cy.get('[data-cy=unit-feet]').should('be.visible');
    cy.get('[data-cy=num-feet-input]').should('be.visible');
  });

  //sub-task #2,3 issue 159
  it('test if areas are correctly loaded to the dropdown for direct seeding', () => {
    cy.waitForPage()
    cy.get('[data-cy=direct-seedings]')
      .click()
    cy.get('[data-cy=direct-area-selection] > [data-cy=dropdown-input] > [data-cy=option0]')
      .should('have.value', 'A')
    cy.get('[data-cy=direct-area-selection] > [data-cy=dropdown-input] > [data-cy=option64]')
      .should('have.value', 'Z')
    cy.get('[data-cy=direct-area-selection] > [data-cy=dropdown-input]')
      .children()
      .should('have.length', 65)
  })

  //sub-task #4 issue 159
  it('checks that there is a field for "Row/Bed" that is empty and enabled', () => {
    cy.get('[data-cy=direct-seedings]').click()
    cy.get('[data-cy=num-rowbed-input] > [data-cy=text-input]')
      .should('be.enabled') // check that it is enabled
      .should('have.value', '')
  })

  //sub-task #5 issue 159
  it('checks that there is a field for "Bed Feed" that is empty and enabled', () => {
    cy.get('[data-cy=direct-seedings]').click()
    cy.get('[data-cy=unit-feet] > [data-cy=dropdown-input]')
      .select('Bed Feet')

    cy.get('[data-cy=num-feet-input] > [data-cy=text-input]')
      .should('be.enabled') // check that it is enabled
      .should('have.value', '')
  })

  //sub-task #6,7 issue 159
  it('should display dropdown for units that is enabled', () => {
    cy.get('[data-cy=direct-seedings]')
      .click()
    cy.get('[data-cy=unit-feet] > [data-cy=dropdown-input] > [data-cy=option0]')
      .should('have.value', 'Bed Feet')
    cy.get('[data-cy=unit-feet] > [data-cy=dropdown-input] > [data-cy=option1]')
      .should('have.value', 'Row Feet')
    cy.get('[data-cy=unit-feet] > [data-cy=dropdown-input]')
      .children()
      .should('have.length', 2)
  })

  //sub-task #8 issue 159  
  it('checks that "Bed Feet" is the default units', () => {
    cy.get('[data-cy=direct-seedings]').click()
    cy.get('[data-cy=unit-feet] > [data-cy=dropdown-input]')
      .should('have.value', 'Bed Feet')
  })
})
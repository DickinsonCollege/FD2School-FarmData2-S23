describe('Tests for SeedingInput log creation', () => {

  beforeEach(() => {
    cy.login('manager1', 'farmdata2')
    cy.visit('/farm/fd2-field-kit/seedingInput')
  })

  it("Checks all of the input elements in the form remain populated with their existing values in tray seeding", () => {

    //type all inputs into seedingInput report
    cy.get('[data-cy=date-select')
      .type('2022-10-06')
    cy.get('[data-cy=crop-selection] > [data-cy=dropdown-input]')
      .select("ARUGULA")
    cy.get('[data-cy=tray-seedings]')
      .click()
    cy.get('[data-cy=tray-area-selection] > [data-cy=dropdown-input]')
      .select("CHUAU")
    cy.get('[data-cy=num-cell-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=num-tray-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=num-seed-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=num-worker-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=minute-input] > [data-cy=text-input]')
      .type('60')
      .blur()

    //click submit button and then click cancel button
    cy.get('[data-cy=submit-button]')
      .click()
    cy.get('[data-cy=cancel-button]')
      .click()

    //checks if the previous input is still exist after clicking cancel button
    cy.get('[data-cy=date-select')
      .should('have.value', '2022-10-06')
    cy.get('[data-cy=crop-selection] > [data-cy=dropdown-input]')
      .should('have.value', "ARUGULA")
    cy.get('[data-cy=tray-seedings]')
      .click()
    cy.get('[data-cy=tray-area-selection] > [data-cy=dropdown-input]')
      .should('have.value', "CHUAU")
    cy.get('[data-cy=num-cell-input] > [data-cy=text-input]')
      .should('have.value', '3')
    cy.get('[data-cy=num-tray-input] > [data-cy=text-input]')
      .should('have.value', '3')
    cy.get('[data-cy=num-seed-input] > [data-cy=text-input]')
      .should('have.value', '3')
    cy.get('[data-cy=num-worker-input] > [data-cy=text-input]')
      .should('have.value', '3')
    cy.get('[data-cy=minute-input] > [data-cy=text-input]')
      .should('have.value', '60')
  })

  it("Checks all of the input elements in the form remain populated with their existing values in direct seeding", () => {

    //type all inputs into seedingInput report
    cy.get('[data-cy=date-select')
      .type('2022-10-06')
    cy.get('[data-cy=crop-selection] > [data-cy=dropdown-input]')
      .select("ARUGULA")
    cy.get('[data-cy=direct-seedings]')
      .click()
    cy.get('[data-cy=direct-area-selection] > [data-cy=dropdown-input]')
      .select('A')
    cy.get('[data-cy=num-rowbed-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=num-feet-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=num-worker-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=minute-input] > [data-cy=text-input]')
      .type('60')
      .blur()

    //click submit button and then click cancel button
    cy.get('[data-cy=submit-button]')
      .click()
    cy.get('[data-cy=cancel-button]')
      .click()

    //checks if the previous input is still exist after clicking cancel button
    cy.get('[data-cy=date-select')
      .should('have.value', '2022-10-06')
    cy.get('[data-cy=crop-selection] > [data-cy=dropdown-input]')
      .should('have.value', "ARUGULA")
    cy.get('[data-cy=direct-seedings]')
      .click()
    cy.get('[data-cy=direct-area-selection] > [data-cy=dropdown-input]')
      .should('have.value', 'A')
    cy.get('[data-cy=num-rowbed-input] > [data-cy=text-input]')
      .should('have.value', '3')
    cy.get('[data-cy=num-feet-input] > [data-cy=text-input]')
      .should('have.value', '3')
    cy.get('[data-cy=num-worker-input] > [data-cy=text-input]')
      .should('have.value', '3')
    cy.get('[data-cy=minute-input] > [data-cy=text-input]')
      .should('have.value', '60')
  })


})
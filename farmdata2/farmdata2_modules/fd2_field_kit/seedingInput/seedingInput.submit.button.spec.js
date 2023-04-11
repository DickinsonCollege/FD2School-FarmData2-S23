/**
 * These tests are for the submit button of the seeding input. 
 * They test the following:
 * - button is initially disabled.
 * - button is enabled when all required fields of tray seeding have valid values.
 * - button is enabled when all required fields of direct seeding have valid values.
 */
describe('Test the submit button behavior', () => {

    beforeEach(() => {
        cy.login('manager1', 'farmdata2')
        cy.visit('/farm/fd2-field-kit/seedingInput')
        cy.waitForPage()
    }) 

    it('Test submit button initially disabled', () => {
        cy.get("[data-cy='submit-button']")
            .should("be.disabled")
    })

    it('test tray seeding input has all required fields when submission button is enabled', () => {
        //tests assume each of the buttons are 
        //Select the tray seeding input type
        cy.get('[data-cy="tray-seedings"]').click()
            .blur()

        //check that the submission button is disabled
        cy.get('[data-cy="submit-button"]')
            .should('be.disabled')

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //check the data section inputs alone don't enable the submit button
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //Select a date
        cy.get('[data-cy="date-selection"] > [data-cy="date-select"]').click()
            .type('2021-04-10')
            .blur()

        //check that the submission button is disabled
        cy.get('[data-cy="submit-button"]')
            .should('be.disabled')

        //select a crop
        cy.get('[data-cy="date-selection"] > [data-cy="dropdown-input"]').click()
            .select('BEAN')
            .blur()

        //check that the submission button is disabled
        cy.get('[data-cy="submit-button"]')
            .should('be.disabled')
    })

})
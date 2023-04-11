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

    it('test tray seeding input has all required fields filled when submission button is enabled', () => {
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
        cy.get('[data-cy="crop-selection"] > [data-cy="dropdown-input"]')
            .select('BEAN')
            .blur()

        //check that the submission button is disabled
        cy.get('[data-cy="submit-button"]')
            .should('be.disabled')
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //check the labor section inputs alone don't enable the submit button
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //Input workers 
        cy.get('[data-cy="num-worker-input"] > [data-cy="text-input"]')
            .type(3)
            .blur()

        //check that the submission button is disabled
        cy.get('[data-cy="submit-button"]')
            .should('be.disabled')

        //Input minutes
        cy.get('[data-cy="minute-input"] > [data-cy="text-input"]')
            .type(30)
            .blur()
            
        //check that the submission button is disabled
        cy.get('[data-cy="submit-button"]')
            .should('be.disabled')

        //Switch time units to hours
        cy.get('[data-cy="time-unit"] > [data-cy="dropdown-input"]')
            .select('hours')
            .blur()

        //Input hours
        cy.get('[data-cy="hour-input"] > [data-cy="text-input"]')
            .type(3)
            .blur()

        //check that the submission button is disabled
        cy.get('[data-cy="submit-button"]')
            .should('be.disabled')

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //check the seeding section tray inputs don't enable the submit button
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //Choose crop area
        cy.get('[data-cy="tray-area-selection"] > [data-cy="dropdown-input"]')
            .select('CHUAU')
            .blur()

        //check that the submission button is disabled
        cy.get('[data-cy="submit-button"]')
            .should('be.disabled')

        //Input Cells/Tray
        cy.get('[data-cy="num-cell-input"] > [data-cy="text-input"]')
            .type(5)
            .blur()
            
        //check that the submission button is disabled
        cy.get('[data-cy="submit-button"]')
            .should('be.disabled')

        //Input Trays
        cy.get('[data-cy="num-tray-input"] > [data-cy="text-input"]')
            .type(5)
            .blur()

        //check that the submission button is disabled
        cy.get('[data-cy="submit-button"]')
            .should('be.disabled')

        //Input Seeds
        cy.get('[data-cy="num-seed-input"] > [data-cy="text-input"]')
            .type(100)
            .blur()

        //all blank fields have now been filled submission button should be enabled
        //check that the submission button is disabled
        cy.get('[data-cy="submit-button"]')
            .should('not.be.disabled')
    })

})
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

    context("Fills in every input field with Tray seeding selected, then perform tests", () => {
        beforeEach(() => {
            //Select a date
            cy.get('[data-cy="date-selection"] > [data-cy="date-select"]').click()
                .type('2021-04-10')
                .blur()
            //select a crop
            cy.get('[data-cy="crop-selection"] > [data-cy="dropdown-input"]')
                .select('BEAN')
                .blur()
            //choose Tray Seeding
            cy.get('[data-cy="tray-seedings"]')
                .click()
            //Choose crop area
            cy.get('[data-cy="tray-area-selection"] > [data-cy="dropdown-input"]')
                .select('CHUAU')
                .blur()
            //Input Cells/Tray
            cy.get('[data-cy="num-cell-input"] > [data-cy="text-input"]')
                .type(5)
                .blur()
            //Input Trays
            cy.get('[data-cy="num-tray-input"] > [data-cy="text-input"]')
                .type(5)
                .blur()
            //Input Seeds
            cy.get('[data-cy="num-seed-input"] > [data-cy="text-input"]')
                .type(100)
                .blur()
            //Input workers 
            cy.get('[data-cy="num-worker-input"] > [data-cy="text-input"]')
                .type(3)
                .blur()
            //Input minutes
            cy.get('[data-cy="minute-input"] > [data-cy="text-input"]')
                .type(30)
                .blur()
        }) 

        it('Test submit button is enabled', () => {
            //with all blank fields filled, the submission button should be enabled
            cy.get('[data-cy="submit-button"]')
                .should('not.be.disabled')
        })

        it('Test the Data Panel', () => {
            //Test date selection is required to enable submission button
            cy.get('[data-cy="date-selection"] > [data-cy="date-select"]').click()
                .invoke('val', '')
            cy.get('[data-cy="submit-button"]')
                .should('be.disabled')
            //populate the date selection and check that the submission button is re-enabled
            cy.get('[data-cy="date-selection"] > [data-cy="date-select"]').click()
                .type('2021-04-10')
                .blur()
            cy.get('[data-cy="submit-button"]')
                .should('not.be.disabled')

            //Test crop selection is required to enable submission button
            cy.get('[data-cy="crop-selection"] > [data-cy="dropdown-input"]')
                .invoke('val', '')
                .trigger('change')
            cy.get('[data-cy="submit-button"]')
                .should('be.disabled')
        })

        it('Test the Tray seeding Panel', () => {
            //Test area dropdown is required to be populated to enable submission button
            cy.get('[data-cy="tray-area-selection"] > [data-cy="dropdown-input"]')
                .invoke('val', '')
                .trigger('change')
            cy.get('[data-cy="submit-button"]')
                .should('be.disabled')
            //populate the area selection and check that the submission button is re-enabled
            cy.get('[data-cy="tray-area-selection"] > [data-cy="dropdown-input"]')
                .select('CHUAU')
                .blur()
            cy.get('[data-cy="submit-button"]')
                .should('not.be.disabled')
                
            //Test Cells/Tray input is required to be populated to enable submission button
            cy.get('[data-cy="num-cell-input"] > [data-cy="text-input"]').click()
                .type('{selectall}{backspace}')
                .blur()
            cy.get('[data-cy="submit-button"]')
                .should('be.disabled')
            //populate Cells/Tray input and check submission button is enabled
            cy.get('[data-cy="num-cell-input"] > [data-cy="text-input"]').click()
                .type('5')
                .blur()
            cy.get('[data-cy="submit-button"]')
                .should('not.be.disabled')

            //Test Trays input is required to be populated to enable submission button
            cy.get('[data-cy="num-tray-input"] > [data-cy="text-input"]').click()
                .type('{selectall}{backspace}')
                .blur()
            cy.get('[data-cy="submit-button"]')
                .should('be.disabled')
            //populate Trays input and check submission button is enabled
            cy.get('[data-cy="num-tray-input"] > [data-cy="text-input"]').click()
                .type('3')
                .blur()
            cy.get('[data-cy="submit-button"]')
                .should('not.be.disabled')

            //Test Seeds input is required to be populated to enable submission button
            cy.get('[data-cy="num-seed-input"] > [data-cy="text-input"]').click()
                .type('{selectall}{backspace}')
                .blur()
            cy.get('[data-cy="submit-button"]')
                .should('be.disabled')
            //populate Seeds input and check submission button is enabled
            cy.get('[data-cy="num-seed-input"] > [data-cy="text-input"]').click()
                .type('50')
                .blur()
            cy.get('[data-cy="submit-button"]')
                .should('not.be.disabled')
        })

        it('Test the Direct seeding Panel', () => {
            //Change to the Direct seeding panel
            cy.get('[data-cy="direct-seedings"]')
                .click()
                .blur()
            //populate the direct seeding panel
            cy.get('[data-cy="direct-area-selection"] > [data-cy="dropdown-input"]')
                .select('CHUAU-1')
                .blur()
            cy.get('[data-cy="num-feet-input"] > [data-cy="text-input"]').click()
                .type('50')
                .blur()
            cy.get('[data-cy="num-rowbed-input"] > [data-cy="text-input"]').click()
                .type('5')
                .blur()
            cy.get('[data-cy="submit-button"]')
                .should('not.be.disabled')
            
            //Test area dropdown is required to be populated to enable submission button
            cy.get('[data-cy="direct-area-selection"] > [data-cy="dropdown-input"]')
                .invoke('val', '')
                .trigger('change')
            cy.get('[data-cy="submit-button"]')
                .should('be.disabled')
            //populate the area selection and check that the submission button is re-enabled
            cy.get('[data-cy="direct-area-selection"] > [data-cy="dropdown-input"]')
                .select('CHUAU-1')
                .blur()
            cy.get('[data-cy="submit-button"]')
                .should('not.be.disabled')
                
            //Test Rows/Bed input is required to be populated to enable submission button
            cy.get('[data-cy="num-rowbed-input"] > [data-cy="text-input"]').click()
                .type('{selectall}{backspace}')
                .blur()
            cy.get('[data-cy="submit-button"]')
                .should('be.disabled')
            //populate Rows/Bed input and check submission button is enabled
            cy.get('[data-cy="num-rowbed-input"] > [data-cy="text-input"]').click()
                .type('5')
                .blur()
            cy.get('[data-cy="submit-button"]')
                .should('not.be.disabled')

            //Test Bed Feet input is required to be populated to enable submission button
            cy.get('[data-cy="num-feet-input"] > [data-cy="text-input"]').click()
                .type('{selectall}{backspace}')
                .blur()
            cy.get('[data-cy="submit-button"]')
                .should('be.disabled')
            //populate Bed Feet input and check submission button is enabled
            cy.get('[data-cy="num-feet-input"] > [data-cy="text-input"]').click()
                .type('50')
                .blur()
            cy.get('[data-cy="submit-button"]')
                .should('not.be.disabled')
        })
    })

    //     it('test if changing units to hours disables the submit button', () => {
    //         //Switch time units to hours
    //         cy.get('[data-cy="time-unit"] > [data-cy="dropdown-input"]')
    //             .select('hours')
    //             .blur()
    //         //Input hours
    //         cy.get('[data-cy="hour-input"] > [data-cy="text-input"]')
    //             .type(3)
    //             .blur()
    //         cy.get('[data-cy="submit-button"]')
    //             .should('not.be.disabled')

    //         //test blank hours field disables submit button
    //         cy.get('[data-cy="hour-input"] > [data-cy="text-input"]')
    //             .type('')
    //             .blur()
    //         cy.get('[data-cy="submit-button"]')
    //             .should('be.disabled')
    //     })

    //     it('Test individual fields are all required to be filled for submit button enabled', () => {
    //         //Clear date selection
    //         cy.get('[data-cy="date-selection"] > [data-cy="date-select"]').click()
    //             .type('2021-04-10')
    //             .blur()
    //         //check that the submission button is disabled
    //         cy.get('[data-cy="submit-button"]')
    //             .should('be.disabled')

    //         //Populate date
    //         cy.get('[data-cy="date-selection"] > [data-cy="date-select"]').click()
    //             .type('2021-04-10')
    //             .blur()

    //         //select a crop
    //         cy.get('[data-cy="crop-selection"] > [data-cy="dropdown-input"]')
    //             .select('BEAN')
    //             .blur()

    //         //Input workers 
    //         cy.get('[data-cy="num-worker-input"] > [data-cy="text-input"]')
    //             .type(3)
    //             .blur()

    //         //Input minutes
    //         cy.get('[data-cy="minute-input"] > [data-cy="text-input"]')
    //             .type(30)
    //             .blur()

    //         //Switch time units to hours
    //         cy.get('[data-cy="time-unit"] > [data-cy="dropdown-input"]')
    //             .select('hours')
    //             .blur()

    //         //Input hours
    //         cy.get('[data-cy="hour-input"] > [data-cy="text-input"]')
    //             .type(3)
    //             .blur()

    //         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //         //check the seeding section tray inputs don't enable the submit button
    //         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //         //Choose crop area
    //         cy.get('[data-cy="tray-area-selection"] > [data-cy="dropdown-input"]')
    //             .select('CHUAU')
    //             .blur()

    //         //check that the submission button is disabled
    //         cy.get('[data-cy="submit-button"]')
    //             .should('be.disabled')

    //         //Input Cells/Tray
    //         cy.get('[data-cy="num-cell-input"] > [data-cy="text-input"]')
    //             .type(5)
    //             .blur()
                
    //         //check that the submission button is disabled
    //         cy.get('[data-cy="submit-button"]')
    //             .should('be.disabled')

    //         //Input Trays
    //         cy.get('[data-cy="num-tray-input"] > [data-cy="text-input"]')
    //             .type(5)
    //             .blur()

    //         //check that the submission button is disabled
    //         cy.get('[data-cy="submit-button"]')
    //             .should('be.disabled')

    //         //Input Seeds
    //         cy.get('[data-cy="num-seed-input"] > [data-cy="text-input"]')
    //             .type(100)
    //             .blur()

    //         //all blank fields have now been filled submission button should be enabled
    //         //check that the submission button is enabled
    //         cy.get('[data-cy="submit-button"]')
    //             .should('not.be.disabled')
    //     })
    // })

//     it('test tray seeding input has all required fields filled when submission button is enabled', () => {
//         //Select the tray seeding input type
//         cy.get('[data-cy="tray-seedings"]').click()
//             .blur()

//         //check that the submission button is disabled
//         cy.get('[data-cy="submit-button"]')
//             .should('be.disabled')

//         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//         //fill every input field
//         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//         //Select a date
//         cy.get('[data-cy="date-selection"] > [data-cy="date-select"]').click()
//             .type('2021-04-10')
//             .blur()

//         //select a crop
//         cy.get('[data-cy="crop-selection"] > [data-cy="dropdown-input"]')
//             .select('BEAN')
//             .blur()

//         //Input workers 
//         cy.get('[data-cy="num-worker-input"] > [data-cy="text-input"]')
//             .type(3)
//             .blur()

//         //Input minutes
//         cy.get('[data-cy="minute-input"] > [data-cy="text-input"]')
//             .type(30)
//             .blur()

//         //Switch time units to hours
//         cy.get('[data-cy="time-unit"] > [data-cy="dropdown-input"]')
//             .select('hours')
//             .blur()

//         //Input hours
//         cy.get('[data-cy="hour-input"] > [data-cy="text-input"]')
//             .type(3)
//             .blur()

//         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//         //check the seeding section tray inputs don't enable the submit button
//         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//         //Choose crop area
//         cy.get('[data-cy="tray-area-selection"] > [data-cy="dropdown-input"]')
//             .select('CHUAU')
//             .blur()

//         //check that the submission button is disabled
//         cy.get('[data-cy="submit-button"]')
//             .should('be.disabled')

//         //Input Cells/Tray
//         cy.get('[data-cy="num-cell-input"] > [data-cy="text-input"]')
//             .type(5)
//             .blur()
            
//         //check that the submission button is disabled
//         cy.get('[data-cy="submit-button"]')
//             .should('be.disabled')

//         //Input Trays
//         cy.get('[data-cy="num-tray-input"] > [data-cy="text-input"]')
//             .type(5)
//             .blur()

//         //check that the submission button is disabled
//         cy.get('[data-cy="submit-button"]')
//             .should('be.disabled')

//         //Input Seeds
//         cy.get('[data-cy="num-seed-input"] > [data-cy="text-input"]')
//             .type(100)
//             .blur()

//         //all blank fields have now been filled submission button should be enabled
//         //check that the submission button is enabled
//         cy.get('[data-cy="submit-button"]')
//             .should('not.be.disabled')
//     })

//     it('test Direct seeding input has all required fields filled when submission button is enabled', () => {

//         //Select the direct seeding input type
//         cy.get('[data-cy="direct-seedings"]').click()
//             .blur()

//         //check that the submission button is disabled
//         cy.get('[data-cy="submit-button"]')
//             .should('be.disabled')

//         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//         //check the direct seeding section  inputs don't enable the submit button
//         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//         //Choose crop area
//         cy.get('[data-cy="direct-area-selection"] > [data-cy="dropdown-input"]')
//             .select('GHANA-1')
//             .blur()

//         //check that the submission button is disabled
//         cy.get('[data-cy="submit-button"]')
//             .should('be.disabled')

//         //Input Rows/Bed
//         cy.get('[data-cy="num-rowbed-input"] > [data-cy="text-input"]')
//             .type(5)
//             .blur()

//         //check that the submission button is disabled
//         cy.get('[data-cy="submit-button"]')
//             .should('be.disabled')

//         // Select Bed Feet
//         cy.get('[data-cy="unit-feet"] > [data-cy="dropdown-input"]')
//             .select('Bed Feet')
//             .blur()

//         //Input Bed Feet
//         cy.get('[data-cy="num-feet-input"] > [data-cy="text-input"]')
//             .type(3)
//             .blur()
//         //check that the submission button is disabled
//         cy.get('[data-cy="submit-button"]')
//             .should('be.disabled')
        
//        // Select Row Feet
//        cy.get('[data-cy="unit-feet"] > [data-cy="dropdown-input"]')
//             .select('Row Feet')
//             .blur()

//         //Input Row Feet
//         cy.get('[data-cy="num-feet-input"] > [data-cy="text-input"]')
//             .type(2)
//             .blur()
//         //check that the submission button is disabled
//         cy.get('[data-cy="submit-button"]')
//             .should('be.disabled')

//          //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//         //check the data section inputs alone don't enable the submit button
//         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//         //Select a date
//         cy.get('[data-cy="date-selection"] > [data-cy="date-select"]').click()
//             .type('2021-04-10')
//             .blur()

//         //check that the submission button is disabled
//         cy.get('[data-cy="submit-button"]')
//             .should('be.disabled')

//         //select a crop
//         cy.get('[data-cy="crop-selection"] > [data-cy="dropdown-input"]')
//             .select('BEAN')
//             .blur()

//         //check that the submission button is disabled
//         cy.get('[data-cy="submit-button"]')
//             .should('be.disabled')
        
//         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//         //check the labor section inputs alone don't enable the submit button
//         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//         //Input workers 
//         cy.get('[data-cy="num-worker-input"] > [data-cy="text-input"]')
//             .type(3)
//             .blur()

//         //check that the submission button is disabled
//         cy.get('[data-cy="submit-button"]')
//             .should('be.disabled')

//         //Input minutes
//         cy.get('[data-cy="minute-input"] > [data-cy="text-input"]')
//             .type(30)
//             .blur()
            
//         //check that the submission button is disabled
//         cy.get('[data-cy="submit-button"]')
//             .should('be.disabled')

//         //Switch time units to hours
//         cy.get('[data-cy="time-unit"] > [data-cy="dropdown-input"]')
//             .select('hours')
//             .blur()

//         //Input hours
//         cy.get('[data-cy="hour-input"] > [data-cy="text-input"]')
//             .type(3)
//             .blur()

//         //all blank fields have now been filled submission button should be enabled
//         //check that the submission button is enabled
//         cy.get('[data-cy="submit-button"]')
//             .should('not.be.disabled')
//     })
})

/**
 * The following are tests for the edit feature  in the seeding report.
 * The tests check that:
 * - The cancel button discards all edits and the log isn't changed
 * - For direct and tray seeding, edits are reflected in the table and database
 */

var FarmOSAPI = require("../../resources/FarmOSAPI.js")
var getSessionToken = FarmOSAPI.getSessionToken

describe('Test the Edit Button Behavior', () => {
    //session token to access database
    let sessionToken = null

    beforeEach(() => {
        cy.login('manager1', 'farmdata2')
        .then (() => {
            cy.wrap(getSessionToken()).as("get-token")
        })

        cy.get("@get-token").then((token) => {
            sessionToken = token
        })
        cy.visit('/farm/fd2-barn-kit/seedingReport')
        cy.waitForPage()
    }) 

    it("Check that cancel edit works", () => {
        //Select start date
        cy.get('[data-cy="date-range-selection"] > [data-cy="start-date-select"] > [data-cy="date-select"]')
            .type('2020-04-10')
            .blur()
    
        //Click generate Report
        cy.get('[data-cy="generate-rpt-btn"]').click()

        //Get row date
        cy.get('[data-cy="r0-Date"]').then(($div)=>{
            //store original row date
            const rowDate = $div.text()
            
            //get and click edit
            cy.get('[data-cy="r0-edit-button"]').click()

            //change date of row
            cy.get('[data-cy="r0-Date-input"]')
                .type('2020-04-10')
            
            //cancel
            cy.get('[data-cy="r0-cancel-button"]')
                .scrollIntoView()
                .should('be.visible')
                .click({force: true})
            
            //check that value is not changed in table
            cy.get('[data-cy="r0-Date"]')
                .should('have.text', rowDate)

            //Check that the row is not updated in the database

            //reload the page to reset the table
            cy.reload()

            //set the same date
            cy.get('[data-cy="date-range-selection"] > [data-cy="start-date-select"] > [data-cy="date-select"]')
            .type('2020-04-10')
            .blur()

            //get the same table
            cy.get('[data-cy="generate-rpt-btn"]').click()

            //check that the value is the same as the original 
            cy.get('[data-cy="r0-Date"]')
                .should('have.text', rowDate)
        })
    })



    
    
})
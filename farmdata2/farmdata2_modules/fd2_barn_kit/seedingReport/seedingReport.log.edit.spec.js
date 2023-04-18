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
        //Select start data
        cy.get('[data-cy="date-range-selection"] > [data-cy="start-date-select"] > [data-cy="date-select"]')
            .type('2020-04-10')
            .blur()
    
        //Click generate Report
        cy.get('[data-cy="generate-rpt-btn"]').click()

        //Get row
        let row =  cy.get('[data-cy="r0"]')

        //Click edit button
        cy.get('[data-cy="r0-edit-button"]').click()

        //Edit date
        cy.get('[data-cy="r0-Date-input"]')
            .type('2020-04-10')
        
        
        //Edit crop input
        cy.get('[data-cy="r0-Crop-input"]')
            .select(0)
        

        //Edit Area
        cy.get('[data-cy="r0-Area-input"]')
            .select('Q')

        //Edit Workers
        cy.get('[data-cy="r0-Workers-input"]')
            .type('4')

        //Edit Hours
        cy.get('[data-cy="r0-Hours-input"]')
            .clear()
            .type('8')

        //Edit comments
        cy.get('[data-cy="td-r0c13"]')
            .type('Test')

        //Edit user
        //cy.get('[data-cy="r0-User-input"]')
            //.select(0)

        //Click cancel
        //cy.get('[data-cy="r0-cancel-button"]').click()

        //Check that row is unchanged

        //Refresh page

        //Check that ros is unchanged

    })



    
    
})
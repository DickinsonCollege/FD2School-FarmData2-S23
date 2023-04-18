/**
 * The following are tests for the edit feature  in the seeding report.
 * The tests check that:
 * - The cancel button discards all edits and the log isn't changed
 * - For direct and tray seeding, edits are reflected in the table and database
 */
const dayjs = require('dayjs')
var FarmOSAPI = require("../../resources/FarmOSAPI.js")
var getSessionToken = FarmOSAPI.getSessionToken
var deleteRecord = FarmOSAPI.deleteRecord
var createRecord = FarmOSAPI.createRecord
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
        //cy.waitForPage()
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


    context("Create a new log, do some tests, delete the log(s) ", () => {

        let logID = null

        beforeEach(() => {
            cy.wrap(makeDirectSeeding("Test Seeding")).as("make-seeding")
            

            cy.get("@make-seeding")
            .then((response) => {
                logID = response.data.id            
            })
        })

        
        it("Check that save edit works for direct seeding.", () => {
           
            
        })

        
        afterEach(() => {
            cy.wrap(deleteRecord("/log/"+logID, sessionToken)).as("delete-seeding")
            cy.get("@delete-seeding")
        })
    })

    function makeDirectSeeding(name) {
        let json = {
            "name": name,
            "type": "farm_seeding",
            "timestamp": dayjs("1999-01-01").unix(),
            "done": "1",  //any seeding recorded is done.
            "notes": {
                "value": "This is a test direct seeding",
                "format": "farm_format"
            },
            "asset": [{ 
                "id": "6",   //Associated planting
                "resource": "farm_asset"
            }],
            "log_category": [{
                "id": "240",
                "resource": "taxonomy_term"
            }],
            "movement": {
                "area": [{
                    "id": "180",
                    "resource": "taxonomy_term"
                }]
            },
            "quantity": [
                {
                    "measure": "length", 
                    "value": "10",  //total row feet
                    "unit": {
                        "id": "20", 
                        "resource": "taxonomy_term"
                    },
                    "label": "Amount planted"
                },
                {
                    "measure": "ratio", 
                    "value": "20",
                    "unit": {
                        "id": "38",
                        "resource": "taxonomy_term"
                    },
                    "label": "Rows/Bed"
                },
                {
                    "measure": "time", 
                    "value": "1.23", 
                    "unit": {
                        "id": "29",
                        "resource": "taxonomy_term"
                    },
                    "label": "Labor"
                },
                {
                    "measure": "count", 
                    "value": "30", 
                    "unit": {
                        "id": "15",
                        "resource": "taxonomy_term"
                    },
                    "label": "Workers"
                },
            ],
            "created": dayjs().unix(),
            "lot_number": "N/A (No Variety)",
            "data": "{\"crop_tid\": \"161\"}"
        }       

        return createRecord('/log', json, sessionToken)
    }
})
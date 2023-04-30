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
var getRecord = FarmOSAPI.getRecord
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

    context("Create a new Direct seeding log, perform tests on it, then delete it. ", () => {
        //set logID to null before creating the Tray seeding log
        let logID = null

        //initialize the new values
        let newDate = '2022-05-10'
        let newArea = "GHANA-3"
        
        //Create the Direct seeding log to be tested upon
        beforeEach(() => {
            cy.wrap(makeDirectSeeding("Test Seeding")).as("make-seeding")

            cy.get("@make-seeding")
            .then((response) => {
                logID = response.data.id            
            })
        })

        it("Check edits made on Direct Seeding are reflected in the table", () => {
            //select the date range to find the new log
            cy.get('[data-cy="date-range-selection"] > [data-cy="start-date-select"] > [data-cy="date-select"]')
            .type('1999-01-01')
            .blur()
            cy.get('[data-cy="date-range-selection"] > [data-cy="end-date-select"] > [data-cy="date-select"]')
            .type('1999-02-02')
            .blur()
    
            //Click generate Report
            cy.get('[data-cy="generate-rpt-btn"]').click()
            cy.get('[data-cy="seeding-type-dropdown"]  > [data-cy=dropdown-input]').select('Direct Seedings')
            //get and click edit
            cy.get('[data-cy="r0-edit-button"]').click()
            //change date of row
            cy.get('[data-cy="r0-Date-input"]')
                .type(newDate)
            //change area of row
            cy.get('[data-cy="r0-Area-input"]')
                .select(newArea)
            
            //save
            cy.get('[data-cy="r0-save-button"]')
                .scrollIntoView()
                .should('be.visible')
                .click({force: true})

            //check that value is changed to the appropriate new values in table
            cy.get('[data-cy="r0-Date"]')
                .should('have.text', newDate)
            cy.get('[data-cy="r0-Area"]')
                .should('have.text', newArea)
        })

        it("Test edits to the Direct seeding logs are reflected in the database", () => {
            //select the date range to find the new log
            cy.get('[data-cy="date-range-selection"] > [data-cy="start-date-select"] > [data-cy="date-select"]')
                .type('1999-01-01')
                .blur()
            cy.get('[data-cy="date-range-selection"] > [data-cy="end-date-select"] > [data-cy="date-select"]')
                .type('1999-02-02')
                .blur()

            //Click generate Report
            cy.get('[data-cy="generate-rpt-btn"]').click()
            cy.get('[data-cy="seeding-type-dropdown"]  > [data-cy=dropdown-input]').select('Direct Seedings')

            //get and click edit
            cy.get('[data-cy="r0-edit-button"]').click()
            //change date of row
            cy.get('[data-cy="r0-Date-input"]')
                .type(newDate)
            //change Area
            cy.get('[data-cy="r0-Area-input"]')
                .select(newArea)
                
            //save
            cy.get('[data-cy="r0-save-button"]')
                .scrollIntoView()
                .should('be.visible')
                .click({force: true})

            //reload the page
            cy.reload()
            cy.waitForPage()
            
            //enter the date range of the edited table entry
            cy.get('[data-cy="date-range-selection"] > [data-cy="start-date-select"] > [data-cy="date-select"]')
                .type('2022-05-10')
                .blur()
            cy.get('[data-cy="date-range-selection"] > [data-cy="end-date-select"] > [data-cy="date-select"]')
                .type('2022-05-11')
                .blur()

            //Click generate Report
            cy.get('[data-cy="generate-rpt-btn"]').click()
            cy.get('[data-cy="seeding-type-dropdown"]  > [data-cy=dropdown-input]').select('Direct Seedings')

            //check that values that were entered remain
            cy.get('[data-cy="r0-Date"]')
                .should('have.text', newDate)
            cy.get('[data-cy="r0-Area"]')
                .should('have.text', newArea)
        })

        it("Check that cancel edit works", () => {
            //select the date range to find the new log
            cy.get('[data-cy="date-range-selection"] > [data-cy="start-date-select"] > [data-cy="date-select"]')
            .type('1999-01-01')
            .blur()
            cy.get('[data-cy="date-range-selection"] > [data-cy="end-date-select"] > [data-cy="date-select"]')
            .type('1999-02-02')
            .blur()

            //Click generate Report
            cy.get('[data-cy="generate-rpt-btn"]').click()
            cy.get('[data-cy="seeding-type-dropdown"]  > [data-cy=dropdown-input]').select('Direct Seedings')
            //get and click edit
            cy.get('[data-cy="r0-edit-button"]').click()
            //change date of row
            cy.get('[data-cy="r0-Date-input"]')
                .type(newDate)
            //change area of row
            cy.get('[data-cy="r0-Area-input"]')
                .select(newArea)
            
            //cancel
            cy.get('[data-cy="r0-cancel-button"]')
                .scrollIntoView()
                .should('be.visible')
                .click({force: true})
            //check that value is not changed in table
            cy.get('[data-cy="r0-Area"')
                .should('have.text', "CHUAU-2")
            cy.get('[data-cy="r0-Date"')
                .should('have.text', "1999-01-01")
            
            //get log from database
            cy.wrap(getRecord("/log.json?id="+logID)).as("get-log")

            //check that values have not been changed
            cy.get("@get-log")
            .then((response) => {
                expect(response.data.list[0].movement.area[0].name).to.equal("CHUAU-2")
                expect(response.data.list[0].timestamp).to.equal(dayjs("1999-01-01").unix().toString())
            })
        })
        
        //Delete Direct seeding report used for testing
        afterEach(() => {
            cy.wrap(deleteRecord("/log/"+logID, sessionToken)).as("delete-seeding")
            cy.get("@delete-seeding")
        })
    })

    context("Create a new Tray seeding log, perform edit tests on it, then delete it.", () => {
        //set logID to null before creating the Tray seeding log
        let logID = null

        //initialize new date and crop Values
        let newDate = '2022-10-11'
        let newArea = "GHANA-3"

        //Create the Tray seeding log to be tested upon
        beforeEach(() => {
            cy.wrap(makeTraySeeding("Test Tray Seeding")).as("make-seeding")
            
            cy.get("@make-seeding")
            .then((response) => {
                logID = response.data.id            
            })
        })
        
        it("Test edits to the Tray seeding logs are reflected in the table", () => {
            //select the date range to find the new log
            cy.get('[data-cy="date-range-selection"] > [data-cy="start-date-select"] > [data-cy="date-select"]')
            .type('1999-01-01')
            .blur()
            cy.get('[data-cy="date-range-selection"] > [data-cy="end-date-select"] > [data-cy="date-select"]')
            .type('1999-02-02')
            .blur()

            //Click generate Report
            cy.get('[data-cy="generate-rpt-btn"]').click()
            cy.get('[data-cy="seeding-type-dropdown"]  > [data-cy=dropdown-input]').select('Tray Seedings')
            //get and click edit
            cy.get('[data-cy="r0-edit-button"]').click()
            //change date of row
            cy.get('[data-cy="r0-Date-input"]')
                .type(newDate)
            //change Area
            cy.get('[data-cy="r0-Area-input"]')
                .select(newArea)
                
            //save
            cy.get('[data-cy="r0-save-button"]')
                .scrollIntoView()
                .should('be.visible')
                .click({force: true})

            //check that the appropriate appears in the table
            cy.get('[data-cy="r0-Date"]')
                .should('have.text', newDate)
            cy.get('[data-cy="r0-Area"]')
                .should('have.text', newArea)
        })

        it("Test edits to the Tray seeding logs are reflected in the database", () => {
            //select the date range to find the new log
            cy.get('[data-cy="date-range-selection"] > [data-cy="start-date-select"] > [data-cy="date-select"]')
                .type('1999-01-01')
                .blur()
            cy.get('[data-cy="date-range-selection"] > [data-cy="end-date-select"] > [data-cy="date-select"]')
                .type('1999-02-02')
                .blur()

            //Click generate Report
            cy.get('[data-cy="generate-rpt-btn"]').click()
            cy.get('[data-cy="seeding-type-dropdown"]  > [data-cy=dropdown-input]').select('Tray Seedings')

            //get and click edit
            cy.get('[data-cy="r0-edit-button"]').click()
            //change date of row
            cy.get('[data-cy="r0-Date-input"]')
                .type(newDate)
            //change Area
            cy.get('[data-cy="r0-Area-input"]')
                .select(newArea)
                
            cy.intercept('PUT', 'log/' + logID).as('logUpdate')

            //save
            cy.get('[data-cy="r0-save-button"]')
                .scrollIntoView()
                .should('be.visible')
                .click({force: true})

            // wait for the log update
            cy.wait('@logUpdate') 
            .should((update) => {
                expect(update.response.statusCode).to.equal(200)

            })
            .then(() => {
                //Forced to reload, otherwise getRecord fetches old log not updated log.
                //Unclear why this happens but is an observed behavior.
                cy.reload()
            })
            .then(() => {
                cy.wrap(getRecord("/log.json?id="+logID)).as("get-log")
            })

            //wait for server to respond
            cy.get("@get-log")
            .then((response) => {
                ///check that the json response reflects the changed values
                expect(response.data.list[0].movement.area[0].name).to.equal(newArea)
                expect(response.data.list[0].timestamp).to.equal(dayjs(newDate).unix().toString())
            })
        })

        //Delete Tray seeding report used for testing
        afterEach(() => {
            cy.wrap(deleteRecord("/log/"+logID, sessionToken)).as("delete-seeding")
            cy.get("@delete-seeding")
        })
    })

    //Creates a new Direct seeding log with specified name.
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
            "data": "{\"crop_tid\": \"162\"}"
        }       

        return createRecord('/log', json, sessionToken)
    }

    //Creates a new Tray seeding log with specified name.
    function makeTraySeeding(name) {
        let json = {
            "name": name,
            "type": "farm_seeding",
            "timestamp": dayjs("1999-01-01").unix(),
            "done": "1",  //any seeding recorded is done.
            "notes": {
                "value": "This is a test tray seeding",
                "format": "farm_format"
            },
            "asset": [{ 
                "id": "6",   //Associated planting
                "resource": "farm_asset"
            }],
            "log_category": [{
                "id": "241",
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
                    "measure": "count", 
                    "value": "10",  //number of seed planted
                    "unit": {
                        "id": "17", 
                        "resource": "taxonomy_term"
                    },
                    "label": "Seeds planted"
                },
                {
                    "measure": "count", 
                    "value": "20",  //number of flats(trays)
                    "unit": {
                        "id": "12", 
                        "resource": "taxonomy_term"
                    },
                    "label": "Flats used"
                },
                {
                    "measure": "ratio", 
                    "value": "30",  //cells per flat
                    "unit": {
                        "id": "37",
                        "resource": "taxonomy_term"
                    },
                    "label": "Cells/Flat"
                },
                {
                    "measure": "time", 
                    "value": "1.23",  //hours worked
                    "unit": {
                        "id": "29",
                        "resource": "taxonomy_term"
                    },
                    "label": "Labor"
                },
                {
                    "measure": "count", 
                    "value": "40",
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
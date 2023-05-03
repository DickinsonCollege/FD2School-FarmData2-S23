const dayjs = require('dayjs')

var FarmOSAPI = require('../../resources/FarmOSAPI.js')
var deleteRecord = FarmOSAPI.deleteRecord
var getSessionToken = FarmOSAPI.getSessionToken
var createRecord = FarmOSAPI.createRecord
var getRecord = FarmOSAPI.getRecord
var getAllPages = FarmOSAPI.getAllPages

describe('Testing if logs are properly removed from the database', () => {
        let sessionToken = null

        beforeEach(() => {
        cy.login("manager1", "farmdata2")
        .then (() => {
            cy.wrap(getSessionToken()).as("get-token")
        })
        cy.get("@get-token").then((token) => {
            sessionToken = token
        })
        cy.visit("/farm/fd2-barn-kit/seedingReport")
        cy.waitForPage()
    })

    context("Create a new log, delete the log(s)", () => {
        let logID = null

        beforeEach(() => {
            cy.wrap(makeDirectSeeding("Test Seeding")).as("make-seeding")
            cy.get("@make-seeding")
            .then((response) => {
                logID = response.data.id            
            })
            cy.get('[data-cy=start-date-select]').type('1999-01-01')
            cy.get('[data-cy=end-date-select]').type('1999-01-04')
            cy.get('[data-cy=generate-rpt-btn]').click()
        })

        it("Test to delete a singular seeding log.", () => {
          cy.wrap(getRecord("/log.json?id=6")).as("get-log")
          cy.get("[data-cy = r0-cbuttonCheckbox]").click()
          cy.get("[data-cy = delete-button]").click()
            expect(true).to.equal(true)
        })

        it("Test to delete a multiple seeding logs.", () => {
        //   cy.wrap(getRecord("/log.json?id=6")).as("get-log")
          cy.get("[data-cy = r0-cbuttonCheckbox]").click()
          cy.get("[data-cy = r1-cbuttonCheckbox]").click()
          cy.get("[data-cy = r2-cbuttonCheckbox]").click()
          cy.get("[data-cy = r5-cbuttonCheckbox]").click()
          cy.get("[data-cy = delete-button]").click()
            expect(true).to.equal(true)
        })

        // it("Test to cancel the deletion of a seeding log(s).", () => {
        //   cy.wrap(getRecord("/log.json?id=6")).as("get-log")
        //   cy.get("[data-cy = r0-cbuttonCheckbox]").click()
        //   cy.get("[data-cy = delete-button]")
        //     // expect(true).to.equal(true)
        // })
        // /**
        //  * Delete the log created in the beforeEach so that the database
        //  * is back to where it started.
        //  */
        // afterEach(() => {
        //     cy.wrap(deleteRecord("/log/"+logID, sessionToken)).as("delete-seeding")
        //     cy.get("@delete-seeding")
        // })
    })

    /**
     * This function will return a promise that creates a new Direct Seeding log.
     */
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

    /**
    * This function will return a promise that creates a new Tray Seeding log.
    */
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
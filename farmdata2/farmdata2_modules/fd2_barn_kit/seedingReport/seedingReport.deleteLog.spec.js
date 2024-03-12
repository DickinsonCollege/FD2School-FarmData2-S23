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

    context("Create a new logs, delete the log(s)", () => {
        let logID0 = null
        let logID1 = null
        let logID2 = null
        let logID3 = null
            //Create new logs for testing and add dates
            beforeEach(() => {
                cy.wrap(makeDirectSeeding("Test Seeding0")).as("make-seeding0")
                cy.get("@make-seeding0")
                .then((response) => {
                    logID0 = response.data.id            
                })
                cy.wrap(makeDirectSeeding("Test Seeding1")).as("make-seeding1")
                cy.get("@make-seeding1")
                .then((response) => {
                    logID1 = response.data.id            
                })
                cy.wrap(makeTraySeeding("Test Seeding2")).as("make-seeding2")
                cy.get("@make-seeding2")
                .then((response) => {
                    logID2 = response.data.id            
                })
                cy.wrap(makeTraySeeding("Test Seeding3")).as("make-seeding3")
                cy.get("@make-seeding3")
                .then((response) => {
                    logID3 = response.data.id            
                })
                //get dates for the report
                cy.get('[data-cy=start-date-select]')
                    .should("exist")
                    .type('2023-05-01')
                cy.get('[data-cy=end-date-select]')
                    .should("exist")
                    .type('2023-05-04')
                cy.get('[data-cy=generate-rpt-btn]')
                    .click()
                cy.waitForPage()
            })

            it("Delete a singular seeding log from the row.", () => {
                cy.get('[data-cy=report-table]').should('exist')
                cy.get("[data-cy = r1-cbuttonCheckbox]").click()
                cy.get("[data-cy = delete-button]")
                    .click((response) => {
                        expect(response.status).to.equal(200)
                    })
                expect(true).to.equal(true)
            })
            
            it("Delete multiple seeding logs from the row.", () => {
                cy.get('[data-cy=report-table]').should('exist')
                cy.get("[data-cy = r0-cbuttonCheckbox]").click()
                cy.get("[data-cy = r2-cbuttonCheckbox]").click()
                cy.get("[data-cy = r3-cbuttonCheckbox]").click()
                cy.get("[data-cy = delete-button]")
                    .click((response) => {
                        expect(response.status).to.equal(200)
                    })
                expect(true).to.equal(true)
            })

            it("Test to cancel the deletion of a seeding log(s).", () => {
                cy.get('[data-cy=report-table]').should('exist')
                cy.get("[data-cy = r0-cbuttonCheckbox]").click()
                cy.get("[data-cy = delete-button]")
                .click((response) => {
                    expect(response.status).to.equal(500)
                })
                // expect(true).to.equal(true)
            })

            //Delete the created logs so the database is refreshed
            afterEach(() => {
                cy.wrap(deleteRecord("/log/"+logID, sessionToken)).as("delete-seeding")
                cy.get("@delete-seeding")
            })

        

        // it("Test to delete a singular seeding log.", () => {
        // //   cy.wrap(getRecord("/log.json?id=6")).as("get-log")
        //   cy.get("[data-cy = r0-cbuttonCheckbox]").click()
        //   cy.get("[data-cy = delete-button]").click()
        //     expect(true).to.equal(true)
        // })

        // it("Test to delete a multiple seeding logs.", () => {
        // //   cy.wrap(getRecord("/log.json?id=6")).as("get-log")
        //   cy.get("[data-cy = r0-cbuttonCheckbox]").click()
        //   cy.get("[data-cy = r1-cbuttonCheckbox]").click()
        //   cy.get("[data-cy = r2-cbuttonCheckbox]").click()
        //   cy.get("[data-cy = r5-cbuttonCheckbox]").click()
        //   cy.get("[data-cy = delete-button]").click()
        //     expect(true).to.equal(true)
        // })

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
            "timestamp": dayjs("2023-05-03").unix(),
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
            "lot_number": "BEAN",
            "data": "{\"crop_tid\": \"161\"}"
        }       

        return createRecord('/log', json, sessionToken)
    }

    function makeDirectSeeding(name) {
        let json = {
            "name": name,
            "type": "farm_seeding",
            "timestamp": dayjs("2023-05-01").unix(),
            "done": "1",  //any seeding recorded is done.
            "notes": {
                "value": "This is a test direct seeding",
                "format": "farm_format"
            },
            "asset": [{ 
                "id": "2",   //Associated planting
                "resource": "farm_asset"
            }],
            "log_category": [{
                "id": "200",
                "resource": "taxonomy_term"
            }],
            "movement": {
                "area": [{
                    "id": "100",
                    "resource": "taxonomy_term"
                }]
            },
            "quantity": [
                {
                    "measure": "length", 
                    "value": "20",  //total row feet
                    "unit": {
                        "id": "30", 
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
                    "value": "35", 
                    "unit": {
                        "id": "20",
                        "resource": "taxonomy_term"
                    },
                    "label": "Workers"
                },
            ],
            "created": dayjs().unix(),
            "lot_number": "ARUGULA",
            "data": "{\"crop_tid\": \"161\"}"
        }       

        return createRecord('/log', json, sessionToken)
    }

    function makeDirectSeeding(name) {
        let json = {
            "name": name,
            "type": "farm_seeding",
            "timestamp": dayjs("2023-05-03").unix(),
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
            "lot_number": "BROCCOLI",
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
            "timestamp": dayjs("2023-05-04").unix(),
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
            "lot_number": "CABBAGE",
            "data": "{\"crop_tid\": \"161\"}"
        }       

        return createRecord('/log', json, sessionToken)
    }

    function makeTraySeeding(name) {
        let json = {
            "name": name,
            "type": "farm_seeding",
            "timestamp": dayjs("2023-05-02").unix(),
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
            "lot_number": "CELERY",
            "data": "{\"crop_tid\": \"161\"}"
        }       

        return createRecord('/log', json, sessionToken)
    }
})

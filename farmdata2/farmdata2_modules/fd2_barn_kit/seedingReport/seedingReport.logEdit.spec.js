var FarmOSAPI = require("../../resources/FarmOSAPI.js")
var getRecord = FarmOSAPI.getRecord

describe('Tests for Canceling SeedingReport log edit', () => {

    beforeEach(() => {
      cy.login('manager1', 'farmdata2')
      cy.visit('/farm/fd2-barn-kit/seedingReport')
      cy.waitForPage()
    })

    it("Checks if the “Cancel” button (the brown X) discards any edits and does not change the database.", () => {


        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        // Check each "editable" column of the record before editing
        //---------------------------------------------------------------------------------------------------------------------------------------------------------

        /*
         * Request the log with id=6.  This is a direct seeding of Radish in 
         * CHUAU-2 on February 04, 2019. 
         */
        cy.wrap(getRecord("/log.json?id=6")).as("get-log")

        /*
         * Wait for the promise returned from getRecord to resolve.
         */
        cy.get("@get-log")
        .then((response) => {
            expect(response.data.list[0].timestamp).to.equal("1549256400") // date
            expect(response.data.list[0].data).to.have.string("161") // crop
            expect(response.data.list[0].movement.area[0].name).to.equal("CHUAU-2") // area
            expect(response.data.list[0].log_category[0].name).to.equal("Direct Seedings") //seeding type
            expect(response.data.list[0].quantity[3].value).to.equal("1") // number of workers
            expect(response.data.list[0].quantity[2].value).to.equal("0.0166667") // hours worked
            expect(response.data.list[0].notes.value).to.equal("") // comments
            expect(response.data.list[0].uid.id).to.equal("3") // user
        })

        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        // Edit each column of the record and then press the cancel button
        //---------------------------------------------------------------------------------------------------------------------------------------------------------


    })

})
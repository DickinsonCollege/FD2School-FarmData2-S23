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
            /*
             * Check the values of only "EDITABLE" column
             * 
             * N0TE: Bed feet is not a field in the JSON file but is computed in the Table in the .html file by the formula below:
             *  
             *                        bedFeet = rowFeet/rowBed

             *       Hence, row feet and row bed are checked instead
             */
            expect(response.data.list[0].timestamp).to.equal("1549256400") // date
            expect(response.data.list[0].data).to.have.string("161") // crop
            expect(response.data.list[0].movement.area[0].name).to.equal("CHUAU-2") // area
            expect(response.data.list[0].quantity[0].value).to.equal("105") // Row feet
            expect(response.data.list[0].quantity[1].value).to.equal("3") // RowBed
            expect(response.data.list[0].quantity[3].value).to.equal("1") // number of workers
            expect(response.data.list[0].quantity[2].value).to.equal("0.0166667") // hours worked
            expect(response.data.list[0].notes.value).to.equal("") // comments
            expect(response.data.list[0].uid.id).to.equal("3") // user
        })

        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        // Select the right record by using filters
        //---------------------------------------------------------------------------------------------------------------------------------------------------------

        cy.get('[data-cy=start-date-select]') // choose start date
            .type('2019-02-04')

        cy.get('[data-cy=end-date-select]') // chose end date
            .type('2019-02-04')

        cy.get('[data-cy=generate-rpt-btn') // press "generate" button
            .click()
        
        cy.get('[data-cy=seeding-type-dropdown] > [data-cy=dropdown-input]') // filter by seeding type 
            .select("Direct Seedings")

        cy.get('[data-cy=crop-dropdown] > [data-cy=dropdown-input]') //filter by crop
            .select("RADISH")
        
        cy.get('[data-cy=area-dropdown] > [data-cy=dropdown-input]') //filter by area
            .select("CHUAU-2")

        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        // Edit each column of the record and then press the cancel button
        //---------------------------------------------------------------------------------------------------------------------------------------------------------

        cy.get('[data-cy=r0-edit-button]')  // click the edit button
            .click()
        
        cy.get('[data-cy=r0-Date-input]') // edit the date
            .clear()
            .type('2023-01-05')
        
        cy.get('[data-cy=r0-Crop-input]') // edit the crop name
            .select(0)

        cy.get('[data-cy=r0-Area-input]') // edit the area
            .select("A")

        cy.get('[data-cy="r0-Row Feet-input"] > [data-cy="text-input"]') // edit the row feet
            .clear()
            .type(99)

        cy.get('[data-cy="r0-Bed Feet-input"] > [data-cy="text-input"]') // edit the bed feet
            .clear()
            .type(99)

        cy.get('[data-cy="r0-Workers-input"] > [data-cy="text-input"]') // edit number of Workers
            .clear()
            .type(99)

        cy.get('[data-cy="r0-Hours-input"] > [data-cy="text-input"]') // edit number of hours
            .clear()
            .type(99)

        cy.get('[data-cy="r0-Comments-input"]') // add a comment
            .clear()
            .type("Running a cypress test ;)")

        cy.get('[data-cy="r0-User-input"]') // edit the user
            .select("guest")

        cy.get('[data-cy="r0-cancel-button"]') // click the cancel button
            .click()

        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        // Check if each "editable" column of the record stays the same after clicking the cancel button
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
            /*
             * Check the values of only "EDITABLE" column
             * 
             * N0TE: Bed feet is not a field in the JSON file but is computed in the Table in the .html file by the formula below:
             *  
             *                        bedFeet = rowFeet/rowBed

             *       Hence, row feet and row bed are checked instead
             */
            expect(response.data.list[0].timestamp).to.equal("1549256400") // date
            expect(response.data.list[0].data).to.have.string("161") // crop
            expect(response.data.list[0].movement.area[0].name).to.equal("CHUAU-2") // area
            expect(response.data.list[0].quantity[0].value).to.equal("105") // Row feet
            expect(response.data.list[0].quantity[1].value).to.equal("3") // RowBed
            expect(response.data.list[0].quantity[3].value).to.equal("1") // number of workers
            expect(response.data.list[0].quantity[2].value).to.equal("0.0166667") // hours worked
            expect(response.data.list[0].notes.value).to.equal("") // comments
            expect(response.data.list[0].uid.id).to.equal("3") // user
        })

    })

})
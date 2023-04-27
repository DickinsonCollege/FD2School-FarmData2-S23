const dayjs = require('dayjs')

var FarmOSAPI = require('../../resources/FarmOSAPI.js')

var getRecord = FarmOSAPI.getRecord
var getSessionToken = FarmOSAPI.getSessionToken
var deleteRecord = FarmOSAPI.deleteRecord
var createRecord = FarmOSAPI.createRecord

var getAllPages = FarmOSAPI.getAllPages

describe('Tests for SeedingInput log creation', () => {

  beforeEach(() => {
    cy.login('manager1', 'farmdata2')
    cy.visit('/farm/fd2-field-kit/seedingInput')
  })

  //sub-task #1 issue #203
  it("Checks all of the input elements in the form remain populated with their existing values in tray seeding", () => {

    //type all inputs into seedingInput report
    cy.get('[data-cy=date-select')
      .type('2022-10-06')
    cy.get('[data-cy=crop-selection] > [data-cy=dropdown-input]')
      .select("ARUGULA")
    cy.get('[data-cy=tray-seedings]')
      .click()
    cy.get('[data-cy=tray-area-selection] > [data-cy=dropdown-input]')
      .select("CHUAU")
    cy.get('[data-cy=num-cell-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=num-tray-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=num-seed-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=num-worker-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=minute-input] > [data-cy=text-input]')
      .type('60')
      .blur()

    //click submit button and then click cancel button
    cy.get('[data-cy=submit-button]')
      .click()
    cy.get('[data-cy=cancel-button]')
      .click()

    //checks if the previous input is still exist after clicking cancel button
    cy.get('[data-cy=date-select')
      .should('have.value', '2022-10-06')
    cy.get('[data-cy=crop-selection] > [data-cy=dropdown-input]')
      .should('have.value', "ARUGULA")
    cy.get('[data-cy=tray-seedings]')
      .click()
    cy.get('[data-cy=tray-area-selection] > [data-cy=dropdown-input]')
      .should('have.value', "CHUAU")
    cy.get('[data-cy=num-cell-input] > [data-cy=text-input]')
      .should('have.value', '3')
    cy.get('[data-cy=num-tray-input] > [data-cy=text-input]')
      .should('have.value', '3')
    cy.get('[data-cy=num-seed-input] > [data-cy=text-input]')
      .should('have.value', '3')
    cy.get('[data-cy=num-worker-input] > [data-cy=text-input]')
      .should('have.value', '3')
    cy.get('[data-cy=minute-input] > [data-cy=text-input]')
      .should('have.value', '60')
  })

  //sub-task #2 issue #203
  it("Checks all of the input elements in the form remain populated with their existing values in direct seeding", () => {

    //type all inputs into seedingInput report
    cy.get('[data-cy=date-select')
      .type('2022-10-06')
    cy.get('[data-cy=crop-selection] > [data-cy=dropdown-input]')
      .select("ARUGULA")
    cy.get('[data-cy=direct-seedings]')
      .click()
    cy.get('[data-cy=direct-area-selection] > [data-cy=dropdown-input]')
      .select('A')
    cy.get('[data-cy=num-rowbed-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=num-feet-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=num-worker-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=minute-input] > [data-cy=text-input]')
      .type('60')
      .blur()

    //click submit button and then click cancel button
    cy.get('[data-cy=submit-button]')
      .click()
    cy.get('[data-cy=cancel-button]')
      .click()

    //checks if the previous input is still exist after clicking cancel button
    cy.get('[data-cy=date-select')
      .should('have.value', '2022-10-06')
    cy.get('[data-cy=crop-selection] > [data-cy=dropdown-input]')
      .should('have.value', "ARUGULA")
    cy.get('[data-cy=direct-seedings]')
      .click()
    cy.get('[data-cy=direct-area-selection] > [data-cy=dropdown-input]')
      .should('have.value', 'A')
    cy.get('[data-cy=num-rowbed-input] > [data-cy=text-input]')
      .should('have.value', '3')
    cy.get('[data-cy=num-feet-input] > [data-cy=text-input]')
      .should('have.value', '3')
    cy.get('[data-cy=num-worker-input] > [data-cy=text-input]')
      .should('have.value', '3')
    cy.get('[data-cy=minute-input] > [data-cy=text-input]')
      .should('have.value', '60')
  })

  //sub-task #3 issue #203
  it("Checks the “Submit” button is enabled when the “Cancel” button is clicked", () => {

    //type all inputs into seedingInput report
    cy.get('[data-cy=date-select')
      .type('2022-10-06')
    cy.get('[data-cy=crop-selection] > [data-cy=dropdown-input]')
      .select("ARUGULA")
    cy.get('[data-cy=direct-seedings]')
      .click()
    cy.get('[data-cy=direct-area-selection] > [data-cy=dropdown-input]')
      .select('A')
    cy.get('[data-cy=num-rowbed-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=num-feet-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=num-worker-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=minute-input] > [data-cy=text-input]')
      .type('60')
      .blur()

    //click submit button and then click cancel button
    cy.get('[data-cy=submit-button]')
      .click()
    cy.get('[data-cy=cancel-button]')
      .click()

    //checks if the "Submit" button is enabled
    cy.get('[data-cy=submit-button]')
      .should('not.be.disabled')
  })

  //sub-task #4 issue #203
  it("Checks no log was created in the database when the “Cancel” button is clicked", () => {

    // Get the start and end timestamps for the date range we want.
    let start = dayjs("2020-05-05", "YYYY-MM-DD").unix()
    // Add 1 day here to get to the end of May 15th.
    let end = dayjs("2020-05-15", "YYYY-MM-DD").add(1, 'day').unix()

    /*
     * Request all of the farm seedings between 2020-05-05 and 2020-05-15. There
     * were 56 seeding in this date range.
     */
    let url = "/log.json?type=farm_seeding&timestamp[gt]=" + start + "&timestamp[lt]=" + end
    let seedingLogsBefore = []
    cy.wrap(getAllPages(url, seedingLogsBefore)).as("get-logs")

    /*
     * Wait for the promise returned from getAllPages to resolve.
     */
    cy.get("@get-logs")
      .then((response) => {
        expect(seedingLogsBefore.length).to.equal(56)
      })

    //type all inputs into seedingInput report
    cy.get('[data-cy=date-select')
      .type('2020-05-10')
    cy.get('[data-cy=crop-selection] > [data-cy=dropdown-input]')
      .select("ARUGULA")
    cy.get('[data-cy=direct-seedings]')
      .click()
    cy.get('[data-cy=direct-area-selection] > [data-cy=dropdown-input]')
      .select('A')
    cy.get('[data-cy=num-rowbed-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=num-feet-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=num-worker-input] > [data-cy=text-input]')
      .type('3')
    cy.get('[data-cy=minute-input] > [data-cy=text-input]')
      .type('60')
      .blur()

    //click submit button and then click cancel button
    cy.get('[data-cy=submit-button]')
      .click()
    cy.get('[data-cy=cancel-button]')
      .click()

    /*
     * Request all of the farm seedings between 2020-05-05 and 2020-05-15 again. There
     * should still be 56 seeding in this date range.
     */
    let seedingLogsAfter = []
    cy.wrap(getAllPages(url, seedingLogsAfter)).as("get-logs-again")

    /*
     * Wait for the promise returned from getAllPages to resolve.
     */
    cy.get("@get-logs-again")
      .then((response) => {
        expect(seedingLogsAfter.length).to.equal(56)
      })
  })
})

describe("Test if 'Submit' button creates a new seeding log in the database", () => {

  let sessionToken = null;
  let logID = null;

  beforeEach(() => {
    cy.login("manager1", "farmdata2")
      .then(() => {
        return cy.wrap(getSessionToken());
      })
      .then((token) => {
        sessionToken = token;
        cy.visit('/farm/fd2-field-kit/seedingInput');
      });
  });

  //sub-task #5 issue #203
  context("Create and check new Direct Seeding log", () => {
    beforeEach(() => {
      cy.wrap(makeDirectSeeding("Test Direct Seeding"))
        .then((response) => {
          logID = response.data.id;
        });
    });

    it("Direct Seeding log is created and found in the database", () => {
      cy.wrap(getRecord(`/log.json?id=${logID}`))
        .then((response) => {
          expect(response.data.list[0].name).to.equal("Test Direct Seeding");
          expect(response.data.list[0].type).to.equal("farm_seeding");
          expect(response.data.list[0].log_category[0].name).to.equal("Direct Seedings");
        });
    });

    afterEach(() => {
      cy.wrap(deleteRecord(`/log/${logID}`, sessionToken));
    });
  });

  //sub-task #6 issue #203
  context("Create and check new Tray Seeding log", () => {
    beforeEach(() => {
      cy.wrap(makeTraySeeding("Test Tray Seeding"))
        .then((response) => {
          logID = response.data.id;
        });
    });

    it("Tray Seeding log is created and found in the database", () => {
      cy.wrap(getRecord(`/log.json?id=${logID}`))
        .then((response) => {
          expect(response.data.list[0].name).to.equal("Test Tray Seeding");
          expect(response.data.list[0].type).to.equal("farm_seeding");
          expect(response.data.list[0].log_category[0].name).to.equal("Tray Seedings");
        });
    });

    afterEach(() => {
      cy.wrap(deleteRecord(`/log/${logID}`, sessionToken));
    });
  });

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
});

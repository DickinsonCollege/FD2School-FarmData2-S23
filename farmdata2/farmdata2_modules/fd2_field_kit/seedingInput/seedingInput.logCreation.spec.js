const dayjs = require('dayjs')
var FarmOSAPI = require("../../resources/FarmOSAPI.js")
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

  it("Checks no log was created in the database", () => {

    // Get the start and end timestamps for the date range we want.
    let start = dayjs("2020-05-05","YYYY-MM-DD").unix()
    // Add 1 day here to get to the end of May 5th.
    let end = dayjs("2020-05-15","YYYY-MM-DD").add(1,'day').unix()

    /*
     * Request all of the farm seedings between 2020-05-01 and 2020-05-15. There
     * were 56 seeding in this date range.
     */
    let url = "/log.json?type=farm_seeding&timestamp[gt]="+start+"&timestamp[lt]="+end
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
     * Request all of the farm seedings between 2020-05-01 and 2020-05-15 again. There
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
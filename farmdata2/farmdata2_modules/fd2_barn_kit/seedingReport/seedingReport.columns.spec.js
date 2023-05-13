const allExpectedHeaders = [
  { "header": 'Date', "visible": false },
  { "header": 'Crop', "visible": false },
  { "header": 'Area', "visible": false },
  { "header": 'Seeding', "visible": false },
  { "header": 'Row Feet', "visible": false },
  { "header": 'Bed Feet', "visible": false },
  { "header": 'Rows/Bed', "visible": false },
  { "header": 'Seeds', "visible": false },
  { "header": 'Trays', "visible": false },
  { "header": 'Cells/Tray', "visible": false },
  { "header": 'Workers', "visible": false },
  { "header": 'Hours', "visible": false },
  { "header": 'Varieties', "visible": false },
  { "header": 'Comments', "visible": false },
  { "header": 'User', "visible": false },
];

describe("Test the seeding report columns by seeding type", () => {
  beforeEach(() => {

    cy.login('manager1', 'farmdata2')
    cy.visit('/farm/fd2-barn-kit/seedingReport')

    // Wait here for the maps to load in the page.
    cy.waitForPage()

    //first generate a report
    cy.get('[data-cy=start-date-select]').type('2020-01-01')
    cy.get('[data-cy=end-date-select]').type('2020-07-01')
    cy.get('[data-cy=generate-rpt-btn]')
      .click()
  })

  it('Checks the Report Table header for the "all" option', () => {
    // Check to see if the checkboxes are visible and enabled
    cy.get("[data-cy=r1-cbuttonCheckbox]").should('not.be.disabled')
    cy.get("[data-cy=r1-cbuttonCheckbox]").should('be.visible')

    cy.get('[data-cy=report-table]')
      .should('exist')

    //Make sure these headers exist on the page and the rest are not
    let includedHeaders = ["Date", "Crop", "Area", "Seeding", "Workers", "Hours", "Varieties", "Comments", "User"]
    let i = 0
    allExpectedHeaders.forEach(header => {
      if (includedHeaders.includes(header.header)) {
        cy.get("[data-cy=h" + i + "]").should('exist')
      } else {
        cy.get("[data-cy=h" + i + "]").should('not.exist')
      }
      i++
    })
    
    cy.get('[data-cy=r1-edit-button]').should('exist');
  });

  it("Tests the direct seeding columns", () => {
    cy.get('[data-cy=seeding-type-dropdown] > [data-cy=dropdown-input]').select('Direct Seedings')

    cy.get('[data-cy=report-table]')
      .should('exist')
    cy.get('[data-cy=selectAll-checkbox]').should('be.visible');

    //Make sure these headers exist on the page and the rest are not
    let includedHeaders = ["Date", "Crop", "Area", "Seeding", "Row Feet", "Bed Feet", "Rows/Bed", "Workers", "Hours", "Varieties", "Comments", "User"]
    let i = 0
    allExpectedHeaders.forEach(header => {
      if (includedHeaders.includes(header.header)) {
        cy.get("[data-cy=h" + i + "]").should('exist')
      } else {
        cy.get("[data-cy=h" + i + "]").should('not.exist')
      }
      i++
    })

    cy.get('[data-cy=r1-edit-button]').should('exist');
  });

  it("Tests the tray seeding columns", () => {
    cy.get('[data-cy=seeding-type-dropdown] > [data-cy=dropdown-input]').select('Tray Seedings')

    cy.get('[data-cy=report-table]')
      .should('exist')
    cy.get('[data-cy=selectAll-checkbox]').should('exist');

    //Make sure these headers exist on the page and the rest are not
    let includedHeaders = ["Date", "Crop", "Area", "Seeding", "Seeds", "Trays", "Cells/Tray", "Workers", "Hours", "Varieties", "Comments", "User"]
    let i = 0
    allExpectedHeaders.forEach(header => {
      if (includedHeaders.includes(header.header)) {
        cy.get("[data-cy=h" + i + "]").should('exist')
      } else {
        cy.get("[data-cy=h" + i + "]").should('not.exist')
      }
      i++
    })

    cy.get('[data-cy=r1-edit-button]').should('exist');
  });
});

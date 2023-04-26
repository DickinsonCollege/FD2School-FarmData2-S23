const expectedHeaderNames = [
  {"header": 'Date', "visible": true},
  {"header": 'Crop', "visible": true},
  {"header": 'Area', "visible": true},
  {"header": 'Seeding', "visible": true},
  {"header": 'Workers', "visible": true},
  {"header": 'Hours', "visible": true},
  {"header": 'Varieties', "visible": true},
  {"header": 'Comments', "visible": true},
  {"header": 'User', "visible": true},
  {"header": 'Edit', "visible": true},
  {"header": 'Seeds', "visible": true},
  {"header": 'Trays', "visible": true},
  {"header": 'Cells/Trays', "visible": true},
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
      // Generate report table
      // Currently, when loaded, the table header is not in the test window. Using scrollToView() will scroll into the table body and pass the table header. Thus, scrollTo() is one solution to scroll the table headers into the test window
      cy.scrollTo(0,50)

      // Check to see if the checkboxes are visible and enabled
      cy.get("[data-cy=r1-cbuttonCheckbox]").should('not.be.disabled')
      cy.get("[data-cy=r1-cbuttonCheckbox]").should('be.visible')

      //Check correctness of other table header columns except for "Edit"
      let headers = ["Date", "Crop", "Area", "Seeding", "Workers", "Hours", " Varieties", "User"]
      let header = 0
      for (header; header < 9; header++){
        cy.get("[data-cy=h"+header+"]").should('have.text', headers[header])
      }

      // Check visibility of table header columns
      let i = 1
      for (i;i<10;i++){
          cy.get(" [data-cy=table-headers]").children().eq(i).should('be.visible')
      }
      cy.get("[data-cy=edit-header]").should('be.visible')

      
      cy.get("[data-cy=r1-cbuttonCheckbox]").should('be.visible')
  })

    it("Tests the direct seeding columns", () =>{
        cy.get('[data-cy=seeding-type-dropdown]  > [data-cy=dropdown-input]').select('Direct Seedings')

        cy.get('[data-cy=report-table]')
            .should('exist')
        cy.get('[data-cy=selectAll-checkbox]').should('be.visible');

        const baseString = '[data-cy=table-headers] > [data-cy=h*]';
        const allHeaders = [
            {"header": 'Date', "visible": true}, 
            {"header": 'Crop', "visible": true}, 
            {"header": 'Area', "visible": true}, 
            {"header": 'Seeding', "visible": true},
            {"header": 'Row Feet', "visible": true},
            {"header": 'Bed Feet', "visible": true},
            {"header": 'Rows/Bed', "visible": true},
            {"header": 'Seeds', "visible": false},
            {"header": 'Trays', "visible": false},
            {"header": 'Cells/Tray', "visible": false},
            {"header": 'Workers', "visible": true},
            {"header": 'Hours', "visible": true},
            {"header": 'Varieties', "visible": true},
            {"header": 'Comments', "visible": true},
            {"header": 'User', "visible": true}
        ];
        cy.get('[data-cy=report-table]').within(() => {
            let j = 0;
            for(let i = 0; i < allHeaders.length; i++){
                if(allHeaders[i].visible){
                    cy.get(baseString.replace('*',j)).should("have.text", allHeaders[i].header)
                    j++;
                }else{
                    j++;
                }
            }
        })
    })

    it("Tests the tray seeding columns", () =>{
        cy.get('[data-cy=seeding-type-dropdown]  > [data-cy=dropdown-input]').select('Tray Seedings')

        cy.get('[data-cy=report-table]')
            .should('exist')

        cy.get('[data-cy=report-table]')
	cy.get('[data-cy=selectAll-checkbox]').should('be.visible');
	cy.get('[data-cy="report-table"]').within(() => {
      
      cy.get('th').each((header, index) => {
        if (index > 0 && index < expectedHeaderNames.length + 1) {
          cy.wrap(header).should('have.text', expectedHeaderNames[index - 1].header);
          if (expectedHeaderNames[index - 1].visible) {
            cy.wrap(header).should('be.visible');
          } else {
            cy.wrap(header).should('not.be.visible');
          }
        }
      });
    });
  });
});



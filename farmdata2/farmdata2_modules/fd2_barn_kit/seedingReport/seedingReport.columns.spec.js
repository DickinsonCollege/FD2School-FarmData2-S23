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

        cy.waitForPage()
    })

    it('Checks the Report Table header for the "all" option', () => {
      // Generate report table

      cy.scrollTo(0,50)

      //Check correctness of table header columns
      cy.get("[data-cy=r1-cbuttonCheckbox]").should('not.be.disabled')
      cy.get(" [data-cy=table-headers]").children().eq(1).should('have.text',"Date")
      cy.get(" [data-cy=table-headers]").children().eq(2).should('have.text',"Crop")
      cy.get(" [data-cy=table-headers]").children().eq(3).should('have.text',"Area")
      cy.get(" [data-cy=table-headers]").children().eq(4).should('have.text',"Seeding")
      cy.get(" [data-cy=table-headers]").children().eq(5).should('have.text',"Workers")
      cy.get(" [data-cy=table-headers]").children().eq(6).should('have.text',"Hours")
      cy.get(" [data-cy=table-headers]").children().eq(7).should('have.text',"Varieties")
      cy.get(" [data-cy=table-headers]").children().eq(8).should('have.text',"Comments")
      cy.get(" [data-cy=table-headers]").children().eq(9).should('have.text',"User")
      //cy.get(" [data-cy=table-headers]").children().eq(10).should('have.text',"Edit")
  
      cy.wait(1000)

      // Check visibility of table header columns
      let i = 1
      for (i;i<10;i++){
          cy.get(" [data-cy=table-headers]").children().eq(i).should('be.visible')
      }

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



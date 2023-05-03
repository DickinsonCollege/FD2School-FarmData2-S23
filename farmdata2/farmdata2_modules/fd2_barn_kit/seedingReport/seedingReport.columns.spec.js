      const allExpectedHeaders = [
        {"header": 'Date', "visible": false}, 
        {"header": 'Crop', "visible": false}, 
        {"header": 'Area', "visible": false}, 
        {"header": 'Seeding', "visible": false},
        {"header": 'Row Feet', "visible": false},
        {"header": 'Bed Feet', "visible": false},
        {"header": 'Rows/Bed', "visible": false},
        {"header": 'Seeds', "visible": false},
        {"header": 'Trays', "visible": false},
        {"header": 'Cells/Tray', "visible": false},
        {"header": 'Workers', "visible": false},
        {"header": 'Hours', "visible": false},
        {"header": 'Varieties', "visible": false},
        {"header": 'Comments', "visible": false},
        {"header": 'User', "visible": false}
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
      // Currently, when loaded, the table header is not in the test window. Using scrollToView() will scroll into the table body and pass the table header. Thus, scrollTo() is one solution to scroll the table headers into the test window
      

      // Check to see if the checkboxes are visible and enabled
      cy.get("[data-cy=r1-cbuttonCheckbox]").should('not.be.disabled')
      cy.get("[data-cy=r1-cbuttonCheckbox]").should('be.visible')

      //Make sure these headers are visible on the page and the rest are not
      let includedHeaders = ["Date", "Crop", "Area", "Seeding", "Workers", "Hours", " Varieties", "User"]
     
      let i = 0
      allExpectedHeaders.forEach(header =>{
        if(includedHeaders.includes(header.header)){
           cy.get("[data-cy=h"+i+"]").should('be.visible')          }
          i++
        })
      //Check the User header seperately
      cy.get("[data-cy=h14]").should("have.text","User")

      // Check visibility of table header columns "Edit" and Select (Checkbox)
      cy.get("[data-cy=edit-header]").should('be.visible')
      cy.get("[data-cy=r1-cbuttonCheckbox]").should('be.visible')
  })


    it("Tests the direct seeding columns", () =>{
        cy.get('[data-cy=seeding-type-dropdown]  > [data-cy=dropdown-input]').select('Direct Seedings')

        cy.get('[data-cy=report-table]')
            .should('exist')
        cy.get('[data-cy=selectAll-checkbox]').should('be.visible');

        //Make sure these headers are visible on the page and the rest are not
        let includedHeaders = ["Date", "Crop", "Area", "Seeding","Row Feet", "Bed Feet", "Rows/Bed", "Workers", "Hours", " Varieties"]
        let i = 0
        allExpectedHeaders.forEach(header =>{
          if(includedHeaders.includes(header.header)){
            cy.get("[data-cy=h"+i+"]").should('be.visible')
          }
          i++
        })
        //Check the User header seperately
        cy.get("[data-cy=h14]").should("have.text","User")

    })

    it("Tests the tray seeding columns", () =>{
        cy.get('[data-cy=seeding-type-dropdown] > [data-cy=dropdown-input]').select('Tray Seedings')

        cy.get('[data-cy=report-table]')
            .should('exist')

        cy.get('[data-cy=report-table]')
        cy.get('[data-cy=selectAll-checkbox]').should('be.visible');
        
        //Make sure these headers are visible on the page and the rest are not
        let includedHeaders = ["Date", "Crop", "Area", "Seeding","Seeds", "Trays", "Cells/Trays", "Workers", "Hours", " Varieties"]
        let i = 0
        allExpectedHeaders.forEach(header =>{
          if(includedHeaders.includes(header.header)){
            cy.get("[data-cy=h"+i+"]").should('be.visible')
          }
          i++
        })
        //Check the User header seperately
        cy.get("[data-cy=h14]").should("have.text","User")

        });
    });



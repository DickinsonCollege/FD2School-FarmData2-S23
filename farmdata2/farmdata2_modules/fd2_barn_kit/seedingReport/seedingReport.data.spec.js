
describe("Test the seeding report columns by seeding type", () => {
    beforeEach(() => {
        cy.login('manager1', 'farmdata2')
        cy.visit('/farm/fd2-barn-kit/seedingReport')

        // Wait here for the maps to load in the page.
        cy.waitForPage()

        //first generate a report
        cy.get('[data-cy=start-date-select]').type('2019-01-01')
        cy.get('[data-cy=end-date-select]').type('2019-03-01')
        
        cy.get('[data-cy=generate-rpt-btn]').click()
		cy.get("[data-cy=seeding-type-dropdown] > [data-cy=dropdown-input]").select("Tray Seedings");

        
    })
	it("Tests Total Number of Seeds Planted in Tray Seeding Summary", () => {
		let total = 0;
	  
		// Get the total number of rows in the table
		cy.get('[data-cy="report-table"] tbody tr').then(($rows) => {
		  const numRows = $rows.length;
	  
		  // Loop through each row and add up the value in column 7
		  for (let r = 0; r < numRows; r++) {
			cy.get("[data-cy=td-r" + r + "c7]").invoke("text").then((value) => {
			  total += parseInt(value);
			});
		  }
	  
		  // Check if the total matches the value in the Tray Seeding Summary
		  cy.get('[data-cy="tray-total-seeds"]').invoke("text").then((value) => {
			expect(total).to.eq(parseInt(value));
		  });
		});
	  });
	  
	  
});



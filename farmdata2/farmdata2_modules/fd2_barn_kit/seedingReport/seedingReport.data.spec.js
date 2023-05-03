
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

	it("Tests Total Number of Seeds Planted, Total Number of Seeding Hours, Total Number of Trays, and Average Seed Planted per Hour in Tray Seeding Summary", () => {
		
		// Total number of seeds planted
		let totalS = 0;

		// Total number of hours
		let totalH = 0;

		// Total number of trays
		let totalT = 0;

		// Get the total number of rows in the table
		cy.get('[data-cy="report-table"] tbody tr').then(($rows) => {
		  const numRows = $rows.length;
	  
		  // Loop through each row and add up the value in column 7,11 into two cumulative values.
		  for (let r = 0; r < numRows; r++) {
			cy.get("[data-cy=td-r" + r + "c7]").invoke("text").then((value) => {
			  totalS += parseInt(value);
			});
			cy.get("[data-cy=td-r" + r + "c11]").invoke("text").then((value) => {
				totalH += parseFloat(value);
			});
			cy.get("[data-cy=td-r" + r + "c8]").invoke("text").then((value) => {
				totalT += parseFloat(value);
			});
			}

		  totalH = Math.round(totalH*100)/100

		  // Number of seeds planted per hour
		  let seedsPerHours = Math.round((totalS/totalH)*100)/100

	  
		  // Check if the total number of seeds planted matches the value in the Tray Seeding Summary
		  cy.get('[data-cy="tray-total-seeds"]').invoke("text").then((value) => {
			expect(totalS).to.eq(parseInt(value));
		  });

		  // Check if the total number of hours matches the value in the Tray Seeding Summary
		  cy.get('[data-cy="tray-total-seeds-hour"]').invoke("text").then((value) => {
			expect(Math.round(totalH*100)/100).to.eq(parseFloat(value));
		  });

		  // Check if the total number of trays matches the value in the Tray Seeding Summary
		  cy.get('[data-cy="tray-total-trays"]').invoke("text").then((value) => {
			expect(totalT).to.eq(parseFloat(value));
		  });

		  // Check if the average seeds planted per hour matches the value in the Tray Seeding Summary
		  cy.get('[data-cy="tray-avg-seeds-hour"]').invoke("text").then((value) => {
			expect(Math.round((totalS/totalH)*100)/100).to.eq(parseFloat(value));
		  });
		});
	  });
	  
	  
});



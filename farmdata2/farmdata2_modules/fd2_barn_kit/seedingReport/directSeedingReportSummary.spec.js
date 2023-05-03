describe('Test the tray seeding ', () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2");
        cy.visit('/farm/fd2-barn-kit/seedingReport');
        cy.waitForPage();
        cy.get("[data-cy=start-date-select]").should("exist").type("2019-01-01");
        cy.get("[data-cy=end-date-select]").should("exist").type("2019-03-01");
        cy.get("[data-cy=generate-rpt-btn]").click();
        cy.get("[data-cy=seeding-type-dropdown] > [data-cy= dropdown-input]").select("Direct Seedings");
       })


    it("Check total row feet plated", () => {
        let total = 0;
        for (let r=0; r <7; r++) {
            cy.get("[data-cy = td-r"+r+ "c4]").invoke('text').then(value => {
                total += parseInt(value);
                if (r ==6){
                    cy.wrap(total).as("to");
                }                
            });      
        }
        cy.get('@to').then(tota => {
            cy.get("[data-cy = direct-total-rowft]").should("have.text", tota.toString());    
        });
    })

    it("Check total bed feet plated", () => {
        let total = 0;
        for (let r=0; r <7; r++) {
            cy.get("[data-cy = td-r"+r+ "c5]").invoke('text').then(value => {
                total += parseInt(value);
                if (r ==6){
                    cy.wrap(total).as("to");
                }    
            });
        }
        cy.get('@to').then(tota => {
            cy.get("[data-cy = direct-total-bedft]").should("have.text", tota.toString());    
        });
    })
    
})

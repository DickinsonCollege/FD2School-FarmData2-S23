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
        // cy.get("[data-cy=td-r0c4]");
        let total = 0;
        for (let r=0; r <7; r++) {
            cy.get("[data-cy = td-r"+r+ "c4]").invoke('text').then(value => {
                total += parseInt(value);
                cy.log(total);
            });
        }
        cy.log(total);

    })
    })




    // cy.get("[data-cy = td-r"+1+ "c4]").invoke('text').then(value => {
    //     return total;
    // }).invoke('text').should("equal", '26177');
    // cy.get("[data-cy=direct-total-rowft]").should('have.text', '26177')
describe("Test the harvest report interactive values", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2");
        cy.visit("/farm/fd2-school/FD2");
    })

    it("Check Generate Button generates report", () => {
        cy.get("[data-cy=report-title]").should("not.exist");
        cy.get("[data-cy=generate-button]").click();
        cy.get("[data-cy=report-title").should("be.visible");
    });

    it("Check Farm Name after click button", () => {
        cy.get("[data-cy=generate-button]").click();
        cy.get("[data-cy=farm-name]").should("have.text", "Farm: Sample Farm");
        cy.get("[data-cy=user-name]").should("contain.text", "manager1");
        cy.get("[data-cy=language]").should("have.text", "English");
    });

    it("Check date input change", () => {
        cy.get("[data-cy=start-date]").should("have.value", "2020-05-05");
        cy.get("[data-cy=end-date]").should("have.value", "2020-05-15");
        cy.get("[data-cy=crop-drop]").should("have.value", "All");
        cy.get("[data-cy=start-date]").type("2020-07-07").should("have.value", "2020-07-07");
        cy.get("[data-cy=end-date]").type("2020-08-08").should("have.value", "2020-08-08");
        cy.get("[data-cy=crop-drop]").select("CHARD").should("have.value", "CHARD")
    });

    it("Check title bound", () =>{
        cy.get("[data-cy=generate-button]").click();
        cy.get("[data-cy=report-title]").should("have.text", "My Sample Harvest Report");
        cy.get("[data-cy=input-title]").clear().type("Testing");
        cy.get("[data-cy=report-title]").should("have.text", "Testing");
    });

    it("Check No Harvest Display", () => {
        cy.get("[data-cy=generate-button]").click();
        cy.get("[data-cy=no-record]").should("not.exist");
        cy.get("[data-cy=start-date]").type("2021-07-07");
        cy.get("[data-cy=end-date]").type("2021-07-08");
        cy.get("[data-cy=generate-button]").click();
        cy.get("[data-cy=no-record]").should("be.visible");
    });

    it("Check Table content", () => {
        cy.get("[data-cy=generate-button]").click().wait(500);
        cy.get("[data-cy=table-record]").children().eq(0).children().filter(':contains("KALE")').should("have.length", 2);
        // cy.get("[data-cy=table-record]").children().eq(0).children().eq(1).get('td').eq(1).should("dayjs.is");
    })

});
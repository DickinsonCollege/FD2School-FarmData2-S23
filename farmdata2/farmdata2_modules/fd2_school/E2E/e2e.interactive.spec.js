describe("Test the harvest report interactive values", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2");
        cy.visit("/farm/fd2-school/e2e");
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

});

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

});

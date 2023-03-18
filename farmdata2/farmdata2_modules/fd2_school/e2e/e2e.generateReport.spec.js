describe("Test the harvest report default values", () => {
  beforeEach(() => {
    cy.login("manager1", "farmdata2");
    cy.visit("/farm/fd2-school/e2e");
  });

  // it("Report title should not be generated", () => {
  //   cy.get("[data-cy=report-title]").should("not.exist");
  // });

  it("Report title appears once clicked", () => {
    cy.get("[data-cy=generate-report-button]").click();

    cy.get("[data-cy=report-title]").should("be.visible");
  });

  it("Check specific information about the harvest page when report page is generated", () => {
    cy.get("[data-cy=generate-report-button]").click()

    cy.get("[data-cy=farm-name]")
        .should("have.text","Farm:Sample Farm")

    cy.get("[data-cy=user-name]")
        .should("contain.text","manager1")

    cy.get("[data-cy=language]")
        .should("have.text","English")
})
});

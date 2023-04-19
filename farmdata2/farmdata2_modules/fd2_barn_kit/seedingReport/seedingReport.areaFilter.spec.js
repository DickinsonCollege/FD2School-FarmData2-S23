describe("Test the tray seeding ", () => {
    beforeEach(() => {
      cy.login("manager1", "farmdata2");
      cy.visit("/farm/fd2-barn-kit/seedingReport");
    });
  
    it("generate multiple areas when 'All' is selected ", () => {
      cy.get("[data-cy=date-range-selection]").should("exist");
      cy.get("[data-cy=start-date-select]").should("exist").type("2019-01-01");
      cy.get("[data-cy=end-date-select]").should("exist").type("2019-03-01");
      cy.intercept("GET", "**/log.json**").as("getReport");
      y.get("[data-cy=generate-rpt-btn]").click();
      cy.wait("@getReport");
      cy.get("[data-cy=dropdown-input]").should("have.value", "All");
      cy.get("[data-cy=r0-Area]").should("have.text", "ALF-4");
      cy.get("[data-cy=r1-Area]").should("have.text", "ALF-2");
      cy.get("[data-cy=r2-Area]").should("have.text", "CHUAU-2");
    });
  });
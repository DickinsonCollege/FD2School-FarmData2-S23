describe("Test the tray seeding ", () => {
    beforeEach(() => {
      cy.login("manager1", "farmdata2");
      cy.visit('/farm/fd2-barn-kit/seedingReport');
      cy.waitForPage();
    });
  
    it("generate multiple areas when 'All' is selected ", () => {
      cy.get("[data-cy=date-range-selection]").should("exist");
      cy.get("[data-cy=start-date-select]").should("exist").type("2019-01-01");
      cy.get("[data-cy=end-date-select]").should("exist").type("2019-03-01");
      cy.intercept("GET", "**/log.json**").as("getReport");
      cy.get("[data-cy=generate-rpt-btn]").click();
      cy.wait("@getReport");
      cy.get("[data-cy=dropdown-input]").should("have.value", "All");
      cy.get("[data-cy=r0-Area]").should("have.text", "ALF-4");
      cy.get("[data-cy=r1-Area]").should("have.text", "ALF-2");
      cy.get("[data-cy=r2-Area]").should("have.text", "CHUAU-2");
    });

    it("Test filter by area", () => {
      cy.get("[data-cy=date-range-selection]").should("exist");
      cy.get("[data-cy=start-date-select]").should("exist").type("2019-01-01");
      cy.get("[data-cy=end-date-select]").should("exist").type("2019-03-01");
      cy.intercept("GET", "**/log.json**").as("getReport");
      cy.get("[data-cy=generate-rpt-btn]").click();
      cy.wait("@getReport");

      cy.get("[data-cy=area-dropdown] > [data-cy=dropdown-input]")
      .select("CHUAU-3")
      .should("have.value", "CHUAU-3")

      cy.get("[data-cy=table-body]").children()
      .should("have.length", 2)

      for (let r = 0; r < 2; r++) {
        cy.get("[data-cy=r" + r + "-" + "Area")
        .should("have.text", "CHUAU-3")
      }
    })
  });
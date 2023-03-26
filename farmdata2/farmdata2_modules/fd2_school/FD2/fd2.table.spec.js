describe("Testing the datafarm2 table", () => {
  beforeEach(() => {
    cy.login("manager1", "farmdata2");
    cy.visit("/farm/fd2-school/FD2");
  });
  
  it("Check the headers of the table", () => {
    cy.get("[data-cy=generate-button]").click();
    cy.get("[data-cy=h0]").should("have.text", "ID");
    cy.get("[data-cy=h1]").should("have.text", "Date");
    cy.get("[data-cy=h2]").should("have.text", "Area");
    cy.get("[data-cy=h3]").should("have.text", "Crop");
    cy.get("[data-cy=h4]").should("have.text", "Yield");
    cy.get("[data-cy=h5]").should("have.text", "Unit");
    cy.get("[data-cy=table-headers]").children().should("have.length", 8);
  });

  it("Check the Crop filter", () => {
    cy.get("[data-cy=crop-drop] > [data-cy=dropdown-input]").select("ASPARAGUS");
    cy.get("[data-cy=generate-button]").click();
    cy.get("[data-cy=table-body]").children().should("have.length", 5);
    for (let i = 0; i <5; i++) {
        cy.get("[data-cy=r"+i+"-Crop]").should("have.text", "ASPARAGUS");
    }
  })
  
});
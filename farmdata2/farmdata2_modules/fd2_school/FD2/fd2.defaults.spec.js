describe("Test the harvest report default values", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2");
        cy.visit("/farm/fd2-school/FD2");
    })

    it("Check the page header", () => {
        cy.get("[data-cy=page-header]").should("have.text", "Harvest Report");
    });

    it("Check the start and end date", () => {
        cy.get("[data-cy= start-date]").should("have.value", "2020-05-05");
        cy.get("[data-cy = end-date]").should("have.value", "2020-05-15");
    } );

    it("Testing Crop Dropdown", () => {
        cy.get("[data-cy=crop-drop] > [data-cy=dropdown-input] > [data-cy=option0]").should("have.value", "All");
        cy.get("[data-cy=crop-drop] > [data-cy=dropdown-input] > [data-cy=option1]").should("have.value", "ARUGULA")
        cy.get("[data-cy= crop-drop] > [data-cy=dropdown-input] > [data-cy=option4]").should("have.value", "BEAN-DRY")
        cy.get("[data-cy=crop-drop] > [data-cy=dropdown-input] > [data-cy=option111]").should("have.value", "ZUCCHINI")
        cy.get("[data-cy=crop-drop] > [data-cy=dropdown-input]").children().should("have.length", 112);
    });

    // it("Check Default Value of Crop Dropdown", () => {
    //     cy.get("[data-cy=crop-drop]").should("have.value", "All");
    // });

    it("Testing Area Dropdown", () => {
        cy.get("[data-cy=area-drop]").children().eq(1).should("have.value", "A");
        cy.get("[data-cy=area-drop]").children().eq(5).should("have.value", "ALF-3");
        cy.get("[data-cy=area-drop]").children().eq(70).should("have.value", "Z");
        cy.get("[data-cy=area-drop]").children().should("have.length", 71);
    });

});

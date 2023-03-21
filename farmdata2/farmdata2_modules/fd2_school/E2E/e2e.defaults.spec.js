describe("Test the harvest report default values", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })
    it("Check the page header", () => {
        cy.get("[data-cy = page-header]")
            .should("have.text","Harvest Report")
    })
    it("Check default start and end dates", () => {
        cy.get("[data-cy = start-date]").should("have.value" , "2020-05-05")
        cy.get("[data-cy = end-date]").should("have.value" , "2020-05-15")
    })
    it("Check the crop dropdown", () => {
        cy.get("[data-cy = crop-dropdown]").children().eq(0).should("have.value" , "ARUGULA")
        cy.get("[data-cy = crop-dropdown]").children().eq(4).should("have.value" , "BEAN-FAVA")
        cy.get("[data-cy = crop-dropdown]").children().eq(110).should("have.value" , "ZUCCHINI")
        cy.get("[data-cy = crop-dropdown]").children().should("have.length" , 111)
    })
    it("Check the area dropdown", () => {
        cy.get("[data-cy = area-dropdown]").children().eq(0).should("have.value" , "A")
        cy.get("[data-cy = area-dropdown]").children().eq(4).should("have.value" , "ALF-3")
        cy.get("[data-cy = area-dropdown]").children().eq(69).should("have.value" , "Z")
        cy.get("[data-cy = area-dropdown]").children().should("have.length" , 70)
    })
})

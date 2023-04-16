describe("Test the contents of harvest report table", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/fd2")
    })

    it("Test table report headers", () => {
        cy.get("[data-cy=generate-btn]").click()
        cy.get("[data-cy=h0]")
        .should("have.text", "Date")
        cy.get("[data-cy=h1]")
        .should("have.text", "Area")
        cy.get("[data-cy=h2]")
        .should("have.text", "Crop")
        cy.get("[data-cy=h3]")
        .should("have.text", "Yield")
        cy.get("[data-cy=h4]")
        .should("have.text", "Units")
    })

    it("Test the number of columns", () => {
        cy.get("[data-cy=generate-btn]").click()
        cy.get("[data-cy=table-headers]").children()
        .should("have.length", 5)
    })

    it("Test filtering by crop", () => {
        cy.get("[data-cy=crop-list] > [data-cy=dropdown-input]")
        .select("ASPARAGUS")
        cy.get("[data-cy=generate-btn").click()
        cy.get("[data-cy=table-body").children()
        .should("have.length", 5)
        cy.get("[data-cy=r0-Crop")
        .should("have.text", "ASPARAGUS")
        cy.get("[data-cy=r1-Crop")
        .should("have.text", "ASPARAGUS")
        cy.get("[data-cy=r2-Crop")
        .should("have.text", "ASPARAGUS")
        cy.get("[data-cy=r3-Crop")
        .should("have.text", "ASPARAGUS")
        cy.get("[data-cy=r4-Crop")
        .should("have.text", "ASPARAGUS")
    })
})
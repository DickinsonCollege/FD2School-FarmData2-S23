describe("Check if the custom-table is displaying right", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/FD2")
    })
    it("Check whether the table header is correct", () => {
        cy.get("[data-cy = generate-report-button]").click()
        cy.get("[data-cy=h0]").should("have.text","ID")
        cy.get("[data-cy=h1]").should("have.text","Date")
        cy.get("[data-cy=h2]").should("have.text","Area")
        cy.get("[data-cy=h3]").should("have.text","Crop")
        cy.get("[data-cy=h4]").should("have.text","Yield")
        cy.get("[data-cy=h5]").should("have.text","Units")
        cy.get("[data-cy=table-headers]").children().should("have.length", 6)
    })
    it("Check whether the table is showing correct contents", () => {
        cy.get("[data-cy=crop-dropdown] > [data-cy=dropdown-input]").select("COLLARDS")
        cy.get("[data-cy=area-dropdown]").select("GHANA-2")
        cy.get("[data-cy = generate-report-button]").click()
        cy.get("[data-cy=table]").children().should("have.length", 2)
        cy.get("[data-cy=td-r0c3]").should("have.text", 'COLLARDS     ')
        cy.get("[data-cy=td-r1c3]").should("have.text", 'COLLARDS     ')
    })
})
describe("Check if the custom-table is displaying right", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/FD2")
        cy.get("[data-cy = generate-report-button]").click()
    })
    it("Check whether the table header is correct", () => {
        cy.get("[data-cy=h0]").should("have.text","ID")
        cy.get("[data-cy=h1]").should("have.text","Date")
        cy.get("[data-cy=h2]").should("have.text","Area")
        cy.get("[data-cy=h3]").should("have.text","Crop")
        cy.get("[data-cy=h4]").should("have.text","Yield")
        cy.get("[data-cy=h5]").should("have.text","Units")
        cy.get("[data-cy=table-headers]").children().should("have.length", 6)
    })
    it("Check whether the table is showing correct contents", () => {
        
    })



})
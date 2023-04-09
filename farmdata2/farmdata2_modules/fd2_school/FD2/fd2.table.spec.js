describe("Test the harvest report table", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/FD2")
    })
      
    it("Check the harvest table headers", () => {
        cy.get("[data-cy=generate-button]").click()
        cy.get("[data-cy=h0]").should("have.text","Date")
        cy.get("[data-cy=h1]").should("have.text","Area")
        cy.get("[data-cy=h2]").should("have.text","Crop")
        cy.get("[data-cy=h3]").should("have.text","Yield")
        cy.get("[data-cy=h4]").should("have.text","Units")
    })

    it("Check the crop dropdown", () => {
        cy.get('[data-cy=crop-select] > [data-cy=dropdown-input]')
        .select('ARUGULA')

        cy.get("[data-cy=generate-button]").click()

        cy.get('[data-cy=table-body]').children()
        .should("have.length", 4)

        cy.get("[data-cy=td-r0c2]")
        .should('contain.text', 'ARUGULA')

        cy.get("[data-cy=td-r1c2]")
        .should('contain.text', 'ARUGULA')

        cy.get("[data-cy=td-r2c2]")
        .should('contain.text', 'ARUGULA')

        cy.get("[data-cy=td-r3c2]")
        .should('contain.text', 'ARUGULA')
    })
})
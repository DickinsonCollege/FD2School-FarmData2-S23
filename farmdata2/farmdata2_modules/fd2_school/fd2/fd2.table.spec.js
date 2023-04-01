describe("Test the harvest table report", () =>{
    beforeEach(()=>{
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/fd2/fd2.html")
    })

    it("Check table headers", () =>{
        cy.get("[data-cy=generate-button]").click()
        cy.get("[data-cy=h0]").should("have.text", "Row")
        cy.get("[data-cy=h1]").should("have.text", "Date")
        cy.get("[data-cy=h2]").should("have.text", "Area")
        cy.get("[data-cy=h3]").should("have.text", "Crop")
        cy.get("[data-cy=h4]").should("have.text", "Yield")
        cy.get("[data-cy=h5]").should("have.text", "Units")
        cy.get("[data-cy=table-headers]").children().should("have.length", 6)
    })

    it("Check table rows", ()=>{
        cy.get("[data-cy=generate-button]").click()
        cy.get("[data-cy=crop-drop-down] > [data-cy=dropdown-input]").select(1)

        cy.get("[data-cy=table-body]").children().should("have.length", 4)
        cy.get("[data-cy=td-r0c3]").should("contains.text", "ARUGULA")
        cy.get("[data-cy=td-r1c3]").should("contains.text", "ARUGULA")
        cy.get("[data-cy=td-r2c3]").should("contains.text", "ARUGULA")
        cy.get("[data-cy=td-r3c3]").should("contains.text", "ARUGULA")
    })
})
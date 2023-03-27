describe("Test the report table", () =>{
    beforeEach(()=>{
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/fd2")
    })

    it("Check generate button - harvest report title",()=>{
        cy.get("[data-cy=title-field]").type("hello")
        cy.get("[data-cy=crop-list] > [data-cy=dropdown-input]").select("BOKCHOY")
        cy.get("[data-cy=generate-title]").should("not.exist")
        cy.get("[data-cy=generate-button]").click()
        cy.get("[data-cy=generate-title]").should("be.visible")


        cy.get("[data-cy=table-headers]").children().should("have.length", 6)
        cy.get("[data-cy=table]").children().should("have.length", 2)


        //cy.get("[data-cy=table-rows]").children().should("have.length", 10)

        cy.get("[data-cy=h0]").should("have.text", "Row")
        cy.get("[data-cy=h1]").should("have.text", "Date")
        cy.get("[data-cy=h2]").should("have.text", "Area")
        cy.get("[data-cy=h3]").should("have.text", "Crop")
        cy.get("[data-cy=h4]").should("have.text", "Yield")
        cy.get("[data-cy=h5]").should("have.text", "Units")

        cy.get("[data-cy=td-r0c3]").should("contain.text", "BOKCHOY")
        cy.get("[data-cy=td-r1c3]").should("contain.text", "BOKCHOY")
        cy.get("[data-cy=td-r2c3]").should("contain.text", "BOKCHOY")



        // cy.get("[data-cy=test-table] > [data-cy=h1]").should("have.text", "Date")
        // cy.get("[data-cy=test-table] > [data-cy=h2]").should("have.text", "Area")
        // cy.get("[data-cy=test-table] > [data-cy=h3]").should("have.text", "Crop")
        // cy.get("[data-cy=test-table] > [data-cy=h4]").should("have.text", "Yield")
        // cy.get("[data-cy=test-table] > [data-cy=h5]").should("have.text", "Units")
    })
})
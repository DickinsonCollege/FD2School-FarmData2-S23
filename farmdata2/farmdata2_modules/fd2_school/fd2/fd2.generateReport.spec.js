describe("Test the harvest report generate report button", () => { 
    beforeEach(() => { 
        cy.login("manager1", "farmdata2") 
        cy.visit("/farm/fd2-school/fd2") 
    }) 

    it("Check the report header", () => { 
        cy.get("[data-cy=report-header]")
        .should("not.exist")
        cy.get("[data-cy=generate-report]").click()
        cy.get("[data-cy=report-header]")
        .should("be.visible")
    }) 

    it("Check the farm name, username, and language", () => { 
        cy.get("[data-cy=generate-report]").click()
        cy.get("[data-cy=farm-name]")
        .should("have.text","Farm:Sample Farm")
        cy.get("[data-cy=report-username]")
        .should("contain.text","manager1")
        cy.get("[data-cy=report-language]")
        .should("have.text","English")
    }) 

}) 
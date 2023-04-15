describe("Testing SubTabs in BarnKit", () => {
    beforeEach(() => {
        cy.login('manager1', 'farmdata2')
        cy.visit('/farm/fd2-barn-kit')
    })
    it("BarnKit tab contains the subtabs" , () => {
        cy.get(".pagination-sm").contains("Info").should("exist")
        cy.get(".pagination-sm").contains("Seeding Report").should("exist")
        cy.get(".pagination-sm").contains("Transplanting Report").should("exist")
    }) 
})
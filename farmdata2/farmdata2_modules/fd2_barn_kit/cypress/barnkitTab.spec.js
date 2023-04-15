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
    it("BarnKit tabs are ordered properly" , () => {
        cy.get(".pagination-sm").contains("Info").first()
        cy.get(".pagination-sm").contains("Transplanting Report").last()//can be improved?
    }) 
    it("BarnKit has two sub tabs" , () => {
        cy.get(".pagination-sm").siblings()//Not finished
    }) 

})
describe("Testing Transplanting Report in BarnKit", () => {
    beforeEach(() => {
        cy.login('manager1', 'farmdata2')
        cy.visit('/farm/fd2-barn-kit/transplantingReport')
    })
    it("Check page headers" ,() => {
        cy.get("[data-cy = report-header]").should("have.text", "Transplanting Report")
        cy.get("[data-cy = section-header]").should("have.text", "Set Dates")
    })

})
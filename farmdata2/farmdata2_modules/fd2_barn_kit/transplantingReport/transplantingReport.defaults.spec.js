const dayjs = require('dayjs')
describe("Testing Transplanting Report in BarnKit", () => {
    beforeEach(() => {
        cy.login('manager1', 'farmdata2')
        cy.visit('/farm/fd2-barn-kit/transplantingReport')
    })
    it("Check page header and section label" ,() => {
        cy.get("[data-cy = report-header]").should("have.text", "Transplanting Report")
        cy.get("[data-cy = section-header]").should("have.text", "Set Dates")
    })
    it("The report table shouldn't be visible", () => {
        cy.get("[data-cy = report-table]").should("not.exist")
    })
    it("Check generate button in table", () => {
        cy.get("[data-cy = generate-rpt-btn]").should("have.text", "Generate Report")
        cy.get("[data-cy = generate-rpt-btn]").should("be.enabled")
    })

})
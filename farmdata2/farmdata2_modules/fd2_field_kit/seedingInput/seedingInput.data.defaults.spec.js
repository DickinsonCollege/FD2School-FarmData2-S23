const dayjs = require('dayjs')

describe("Test Data section of Seeding Input form", () =>{


    beforeEach(() => {
        cy.login('manager1', 'farmdata2')
        cy.visit('/farm/fd2-field-kit/seedingInput')
    }) 

    it("Checks the Data header", () => {
        cy.get("[data-cy=data-header").should('have.text',"Data")
    })

    it("Checks the Date input element selected", () => {
        cy.get("[data-cy=date-selection").should('not.be.disabled')
    })

    it("Checks if selected date is current date", () => {
        cy.get('[data-cy=date-selection] input[type=date]').should('be.visible').should('have.value', dayjs().format('YYYY-MM-DD'));
    })

    it("Checks the crop dropdown is correct", () => {
        cy.get("[data-cy=crop-selection] > [data-cy=dropdown-input")
            .children()
            .first().should("have.text", "ARUGULA")
        cy.get("[data-cy=crop-selection] > [data-cy=dropdown-input")
            .children()
            .last().should("have.text", "ZUCCHINI")
        cy.get("[data-cy=crop-selection] > [data-cy=dropdown-input")
            .children()
            .should("have.length", "111")
    })
})
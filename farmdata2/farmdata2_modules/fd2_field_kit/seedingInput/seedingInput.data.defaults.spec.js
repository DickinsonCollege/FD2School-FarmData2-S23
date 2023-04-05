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

    // task #4
    it("Checks if crop-dropdown is enabled", ()=>{
        cy.get("[data-cy=crop-selection] > [data-cy=dropdown-input]").should("not.be.disabled")
        cy.get("[data-cy=crop-selection] > [data-cy=dropdown-input]").should("have.text", "")
    })

    // task #5
    it("Checks if any crop-dropdown option has been selected ", ()=>{
        cy.get("[data-cy=crop-selection] > [data-cy=dropdown-input]").should("have.text", "")
    })    

    //task #6
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
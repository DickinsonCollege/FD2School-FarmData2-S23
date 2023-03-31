const dayjs = require('dayjs')

describe("Test Data section of Seeding Input form", () =>{


    beforeEach(() => {
        cy.login('manager1', 'farmdata2')

        
        // Cypress clears the local storage between each test.  
        // So we need to save it at the end of each test (see afterEach)
        // and then restore beore each test (here). 
        cy.restoreLocalStorage() 
        cy.visit('/farm/fd2-field-kit/seedingInput')
    }) 


    //task #1
    it("Checks the Data header", () => {
        cy.get("[data-cy=data-header").should('have.text',"Data")
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
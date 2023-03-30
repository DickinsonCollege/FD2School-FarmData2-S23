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
    it("Checks the Data header", () => {
        cy.get("[data-cy=data-header").should('have.text',"Data")
    })
})
describe('Test the Edit Button Behavior', () => {
    /*
    Tests the behavior of the log edit button.
    */
    beforeEach(() => {
        cy.login('manager1', 'farmdata2')
        cy.visit('/farm/fd2-field-kit/seedingReport')
        cy.waitForPage()
    }) 


})
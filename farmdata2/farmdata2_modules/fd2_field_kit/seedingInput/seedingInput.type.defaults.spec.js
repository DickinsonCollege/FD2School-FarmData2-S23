describe("Tests for seeding input", () => {

  before(() => {
    // Delete the crops and areas from local storge if it is there
    // before running our tests.  
    localStorage.removeItem('crops')
    localStorage.removeItem('areas')
  })

  beforeEach(() => {
    cy.login('manager1', 'farmdata2')

    // Cypress clears the local storage between each test.  
    // So we need to save it at the end of each test (see afterEach)
    // and then restore before each test (here). 
    cy.restoreLocalStorage()
    cy.visit('/farm/fd2-field-kit/seedingInput')
  })

  afterEach(() => {
    // Save the local storage at the end of each test so 
    // that it can be restored at the start of the next 
    cy.saveLocalStorage()
  })

  it('test the first visit to the page (i.e. no cached crops and areas)', () => {
    // This needs to be the first test run to work properly.
    // First time through the crops and areas should not be cached.
    // Note the cached value is cleared in the before().
    let crops = localStorage.getItem('crops')
    let areas = localStorage.getItem('areas')

    expect(crops).to.equal(null)
    expect(areas).to.equal(null)

    // Set up intercepts to wait for the map to be loaded for caching. 
    cy.intercept('GET', 'taxonomy_term?bundle=farm_crops&page=1').as('cropmap')
    cy.intercept('GET', 'taxonomy_term.json?bundle=farm_areas').as('areamap') 
    // Wait here for the maps to load in the page. 
    cy.wait(['@cropmap', '@areamap']) 
  })

  //issue 159 sub-task 1
  it('should display the Direct Seeding section when Direct is selected', () => {
    cy.get('[data-cy=direct-seedings]').check();
    cy.get('[data-cy=direct-area-selection]').should('be.visible');
    cy.get('[data-cy=num-rowbed-input]').should('be.visible');
    cy.get('[data-cy=unit-feet]').should('be.visible');
    cy.get('[data-cy=num-feet-input]').should('be.visible');
  });

  //issue 159 sub-task 2, 3
  it('test if areas are correctly loaded to the dropdown for direct seeding', () => {
    // Applying the filter to the area dropdown for direct seeding
    let areaArray = []
    let areaResponse = JSON.parse(localStorage.getItem('areas'))
    let directAreaOnly = areaResponse.filter((x) => x.area_type === 'field' || x.area_type === 'bed')
    areaArray = directAreaOnly.map((h) => h.name)

    cy.get('[data-cy=direct-seedings]')
      .click()
      .then(() => {
        cy.get('[data-cy=direct-area-selection] > [data-cy=dropdown-input]')
          .children() 
          .first()
          .should('have.value', 'A')
        cy.get('[data-cy=direct-area-selection] > [data-cy=dropdown-input]')
          .children() 
          .last()  
          .should('have.value', 'Z')
        cy.get('[data-cy=direct-area-selection] > [data-cy=dropdown-input]')
          .children() 
          .should('have.length', areaArray.length)
        })
  })

  //issue 159 sub-task 4
  it('checks that there is a field for "Row/Bed" that is empty and enabled', () => {
    cy.get('[data-cy=direct-seedings]').click()
    cy.get('[data-cy=num-rowbed-input] > [data-cy=text-input]')
      .should('be.enabled') // check that it is enabled
      .should('have.value', '')
  })

    
  //issue 159 sub-task 5
  it('checks that there is a field for "Bed Feed" that is empty and enabled', () => {
    cy.get('[data-cy=direct-seedings]').click()
    cy.get('[data-cy=unit-feet] > [data-cy=dropdown-input]')
      .select('Bed Feet')

    cy.get('[data-cy=num-feet-input] > [data-cy=text-input]')
      .should('be.enabled') // check that it is enabled
      .should('have.value', '')
  })

  //issue 159 sub-task 6, 7 
  it('should display dropdown for units that is enabled', () => {
    cy.get('[data-cy=direct-seedings]')
      .click()
      .then(() => {
        cy.get('[data-cy=unit-feet] > [data-cy=dropdown-input]')
          .children() 
          .first()
          .should('have.value', 'Bed Feet')
        cy.get('[data-cy=unit-feet] > [data-cy=dropdown-input]')
          .children() 
          .last()  
          .should('have.value', 'Row Feet')
        cy.get('[data-cy=unit-feet] > [data-cy=dropdown-input]')
          .children() 
          .should('have.length', 2)
      })
  })
    
  //issue 159 sub-task 8
  it('checks that "Bed Feet" is the default units', () => {
    cy.get('[data-cy=direct-seedings]').click()
    cy.get('[data-cy=unit-feet] > [data-cy=dropdown-input]')
    .invoke('val')
    .should('equal', 'Bed Feet')
  })
})
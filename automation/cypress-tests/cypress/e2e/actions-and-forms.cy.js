describe('Cypress E2E: Form Actions & Validation Suite', () => {
  beforeEach(() => {
    cy.visit('/commands/actions');
  });

  it('verifies page header and action form visibility', () => {
    cy.get('h1').should('contain.text', 'Actions');
    cy.get('.action-email').should('be.visible');
  });

  it('types email, submits, and asserts field value and state', () => {
    const testEmail = 'yulia.agustin.qa@example.com';
    cy.get('.action-email')
      .type(testEmail)
      .should('have.value', testEmail);

    cy.get('.action-disabled')
      .should('be.disabled');
  });

  it('handles checkbox selection and verification', () => {
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
      .check()
      .should('be.checked');
  });
});

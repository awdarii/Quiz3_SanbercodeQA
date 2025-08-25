describe('OrangeHRM Login Tests', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC_001 - Login dengan username dan password valid', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);

    cy.url().should('include', '/dashboard'); // berhasil login
  });

  it('TC_002 - Login dengan username salah dan password benar', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').type('Adminn');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);

    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC_003 - Login dengan username benar dan password salah', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin1234');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);

    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC_004 - Login dengan username salah dan password salah', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').type('Adminn');
    cy.get('input[name="password"]').type('admin1234');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);

    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC_005 - Login dengan username kosong dan password valid', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group > .oxd-text').should('contain', 'Required');
  });

  it('TC_006 - Login dengan username valid dan password kosong', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group > .oxd-text').should('contain', 'Required');
  });

  it('TC_007 - Login dengan username dan password kosong', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group > .oxd-text').should('contain', 'Required');
  });

  it('TC_008 - Login dengan spasi di username', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').type(' Admin ');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);

    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC_009 - Login dengan username/password yang salah berulang kali', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);

    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC_010 - Klik Forget Your Password', () => {
    cy.contains('Forgot your password?').click();

    cy.url().should('include', '/requestPasswordResetCode');
  });

});

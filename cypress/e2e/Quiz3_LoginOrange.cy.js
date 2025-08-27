import LoginPage from "../pages/loginPage";

describe('OrangeHRM Login Tests', () => {

  // beforeEach(() => {
  //   cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  // });

  beforeEach(() => {
    cy.intercept("POST", "**/auth/validate*").as("loginRequest");
  });

  it('TC_001 - Login dengan username dan password valid', () => {
    LoginPage.visit();
    LoginPage.enterUsername("Admin");
    LoginPage.enterPassword("admin123");
    LoginPage.clickLogin();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);

    LoginPage.assertDashboard();
  });

  it('TC_002 - Login dengan username salah dan password benar', () => {
    LoginPage.visit();
    LoginPage.enterUsername("wrongpass");
    LoginPage.enterPassword("admin123");
    LoginPage.clickLogin();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);

    LoginPage.assertErrorMessage();
  });

  it('TC_003 - Login dengan username benar dan password salah', () => {
    LoginPage.visit();
    LoginPage.enterUsername("Admin");
    LoginPage.enterPassword("admin1234");
    LoginPage.clickLogin();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);

    LoginPage.assertErrorMessage();
  });

  it('TC_004 - Login dengan username salah dan password salah', () => {
    LoginPage.visit();
    LoginPage.enterUsername("Adminn");
    LoginPage.enterPassword("admin1234");
    LoginPage.clickLogin();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);

    LoginPage.assertErrorMessage();
  });

  it('TC_005 - Login dengan username kosong dan password valid', () => {
    LoginPage.visit();
    LoginPage.enterPassword("admin123");
    LoginPage.clickLogin();

    LoginPage.assertErrorRequired();
  });

  it('TC_006 - Login dengan username valid dan password kosong', () => {
    LoginPage.visit();
    LoginPage.enterUsername("Admin");
    LoginPage.clickLogin();

    LoginPage.assertErrorRequired();
  });

  it('TC_007 - Login dengan username dan password kosong', () => {
    LoginPage.visit();
    LoginPage.clickLogin();

    LoginPage.assertErrorRequired();
  });

  it('TC_008 - Login dengan spasi di username', () => {
    LoginPage.visit();
    LoginPage.enterUsername(" Admin");
    LoginPage.enterPassword("admin123");
    LoginPage.clickLogin();

    LoginPage.assertErrorMessage();
  });

  it('TC_009 - Login dengan username/password yang salah berulang kali', () => {
    LoginPage.visit();
    LoginPage.enterUsername("Adminn");
    LoginPage.enterPassword("admin1223");
    LoginPage.clickLogin();

    LoginPage.assertErrorMessage();
  });

  it('TC_010 - Klik Forget Your Password', () => {
    LoginPage.visit();
    LoginPage.clickForgot();
  });

});

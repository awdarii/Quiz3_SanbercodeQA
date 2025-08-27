class LoginPage {
  usernameField = "input[name='username']";
  passwordField = "input[name='password']";
  loginButton = "button[type='submit']";
  forgotPassword = ".orangehrm-login-forgot-header";
  dashboardHeader = ".oxd-topbar-header-breadcrumb > h6";
  errorMessage = ".oxd-alert-content-text";

  // === Method Action ===
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  enterUsername(username) {
    cy.get(this.usernameField).type(username);
  }

  enterPassword(password) {
    cy.get(this.passwordField).type(password);
  }

  clickLogin() {
    cy.get(this.loginButton).click();
  }

  clickForgot() {
    cy.get(this.forgotPassword).click();
  }

  assertDashboard() {
    cy.get(this.dashboardHeader).should("contain.text", "Dashboard");
  }

  assertErrorMessage() {
    cy.get(".oxd-alert-content-text").should("be.visible");
  }

  assertErrorRequired() {
    cy.get("span.oxd-text").should("be.visible");
  }
}

export default new LoginPage();
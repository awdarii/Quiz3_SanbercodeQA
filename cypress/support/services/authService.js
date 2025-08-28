class AuthService {
  register(data) {
    return cy.request({
      method: "POST",
      url: "https://reqres.in/api/register",
      body: data,
      failOnStatusCode: false
    });
  }

  login(data) {
    return cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      body: data,
      failOnStatusCode: false
    });
  }
}

export default new AuthService();

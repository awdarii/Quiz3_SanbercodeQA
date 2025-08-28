class UserService {
  getListUsers(page = 2) {
    return cy.request("GET", `https://reqres.in/api/users?page=${page}`);
  }

  getSingleUser(id) {
    return cy.request({
        method: "GET",
        url: `https://reqres.in/api/users/${id}`,
        failOnStatusCode: false
        });
    }

  createUser(user) {
    return cy.request({
        method: "POST", 
        url: "https://reqres.in/api/users/${id}",
        failOnStatusCode: false
    });
  }

  updateUser(id, user) {
    return cy.request({
        method: "PUT", 
        url: `https://reqres.in/api/users/${id}`,
        failOnStatusCode: false
    });
  }

  patchUser(id, user) {
    return cy.request({
        method: "PATCH", 
        url: `https://reqres.in/api/users/${id}`,
        failOnStatusCode: false
    });
  }

  deleteUser(id) {
    return cy.request({
        method: "DELETE", 
        url: `https://reqres.in/api/users/${id}`,
        failOnStatusCode: false
    });
  }
}

export default new UserService();

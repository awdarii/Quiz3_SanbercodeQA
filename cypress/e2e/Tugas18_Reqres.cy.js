import UserService from "../support/services/userService";
import AuthService from "../support/services/authService";
import ResourceService from "../support/services/resourceService";

describe("ReqRes API Automation with POM", () => {

  it("1. GET - List Users", () => {
    UserService.getListUsers().its("status").should("eq", 200);
  });

  it("2. GET - Single User", () => {
    UserService.getSingleUser(2).its("status").should("eq", 200);
  });

  it("3. GET - Single User Not Found", () => {
    UserService.getSingleUser(23).its("status").should("eq", 401);
  });

  it("4. GET - List Resource", () => {
    ResourceService.getListResource().its("status").should("eq", 401);
  });

  it("5. GET - Single Resource", () => {
    ResourceService.getSingleResource(2).its("status").should("eq", 200);
  });

  it("6. GET - Single Resource Not Found", () => {
    ResourceService.getSingleResource(23).its("status").should("eq", 401);
  });

  it("7. POST - Create User", () => {
    UserService.createUser({ name: "morpheus", job: "leader" })
      .its("status").should("eq", 401);
  });

  it("8. PUT - Update User", () => {
    UserService.updateUser(2, { name: "morpheus", job: "zion resident" })
      .its("status").should("eq", 401);
  });

  it("9. PATCH - Update User", () => {
    UserService.patchUser(2, { job: "rebel" })
      .its("status").should("eq", 401);
  });

  it("10. DELETE - Delete User", () => {
    UserService.deleteUser(2).its("status").should("eq", 401);
  });

  it("11. POST - Register Successful", () => {
    AuthService.register({
      email: "eve.holt@reqres.in",
      password: "pistol"
    }).its("status").should("eq", 401);
  });

  it("12. POST - Register Unsuccessful", () => {
    AuthService.register({ email: "sydney@fife" })
      .its("status").should("eq", 401);
  });

  it("13. POST - Login Successful", () => {
    AuthService.login({
      email: "eve.holt@reqres.in",
      password: "cityslicka"
    }).its("status").should("eq", 401);
  });

  it("14. POST - Login Unsuccessful", () => {
    AuthService.login({ email: "peter@klaven" })
      .its("status").should("eq", 401);
  });

  it("15. GET - Delayed Response", () => {
    ResourceService.getDelayedResponse(3).its("status").should("eq", 401);
  });

  it("16. GET - List Users with per_page=1", () => {
    UserService.getListUsers(1).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data.length).to.be.gte(1);
    });
  });

  it("17. POST - Create Multiple Users", () => {
    cy.fixture("Tugas18/users").then((users) => {
      users.forEach((user) => {
        UserService.createUser(user).then((res) => {
          expect(res.status).to.eq(401);
          expect(res.body).to.have.property("error", "Missing API key");
        });
      });
    });
  });

});

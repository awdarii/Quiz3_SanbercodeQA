class ResourceService {
  getListResource() {
    return cy.request({
        method: "GET", 
        url: "https://reqres.in/api/unknown",
        failOnStatusCode: false
    });
  }

  getSingleResource(id) {
    return cy.request({
      method: "GET",
      url: `https://reqres.in/api/unknown/${id}`,
      failOnStatusCode: false
    });
  }

  getDelayedResponse(delay = 3) {
    return cy.request({
        method: "GET", 
        url: `https://reqres.in/api/users?delay=${delay}`,
        failOnStatusCode: false
    });
  }
}

export default new ResourceService();

Cypress.Commands.add("login", (username, password) => {
  cy.session("username", () => {
    cy.intercept("POST", "/login").as("loginAPI");
    //navigate to the URL
    cy.visit("/");
    //log in with valid credentials
    cy.get("#login2").click();
    cy.get("#logInModal").should("be.visible");
    cy.wait(1000);
    cy.get("#loginusername").type(username);
    cy.get("#loginpassword").type(password);
    cy.contains(".btn-primary", "Log in").click();
    //API validation for successful login
    cy.wait("@loginAPI").then((object) => {
      expect(object.response.statusCode).to.eq(200);
    });
    //UI interface validations of the successful login
    cy.get("#nameofuser").should("contain", username);
    cy.get("#logout2").should("contain", "Log out");
  });
});

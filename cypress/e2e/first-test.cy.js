let username = Cypress.env("username");
let password = Cypress.env("password");

describe("demoblaze login", () => {
  before(() => {
    cy.intercept("POST", "https://api.demoblaze.com/login").as("loginAPI");
  });
  it("user logs in successfully with valid creds", () => {
    //log in with valid credentials
    cy.visit("/");
    cy.get("#login2").click();
    cy.get("#logInModal").should("be.visible");
    cy.wait(1000);
    cy.get("#loginusername").type(username);
    cy.get("#loginpassword").type(password);
    cy.contains(".btn-primary", "Log in").click();
    //API validation that user is logged in
    cy.wait("@loginAPI").then((object) => {
      expect(object.response.statusCode).to.eq(200);
    });

    //UI validations that user is logged in
    cy.get("#nameofuser").should("contain", username);
  });
});

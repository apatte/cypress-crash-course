let username = "lambdaTester";
let password = "Tester01";

describe("User Login Flow", () => {
  beforeEach(() => {
    cy.intercept("POST", "https://api.demoblaze.com/login").as("loginAPI");
  });
  it("user logs in successfully with valid credentials", () => {
    cy.visit("https://www.demoblaze.com/");
    cy.get("#login2").click();
    cy.get("#logInModal").should("be.visible");
    cy.get("#loginusername").clear().type(username);
    cy.get("#loginpassword").clear().type(password);
    cy.get(".btn-primary").contains("Log in").click();
    cy.wait("@loginAPI").then((object) => {
      expect(object.response.statusCode).to.eq(200);
    });
    cy.get("#nameofuser").should("contain", username);
    cy.get("#logout2").should("contain", "Log out");
  });
});

let username = Cypress.env("username");
let password = Cypress.env("password");
let product1 = "/prod.html?idp_=1";
let product2 = "/prod.html?idp_=2";

describe("add product to cart", () => {
  beforeEach(() => {
    cy.login(username, password);
  });
  it("adds one product to cart", () => {
    cy.visit(product1);
    cy.contains(".btn", "Add to cart").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Product added.");
    });
  });
  it("adds another product to cart", () => {
    cy.visit(product2);
    cy.contains(".btn", "Add to cart").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Product added.");
    });
  });
});

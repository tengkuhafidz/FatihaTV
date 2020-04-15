describe("Given user is on homepage, When user types into the search box,", () => {
  it("The playlist list will return filtered result based on the words entered", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.get('[data-cy="search-box"]')
      .focus()
      .type("Fatris", { force: true });

    cy.get('[data-cy="playlist-card"]')
      .first()
      .should("contain", "Ustaz Fatris");
  });
});

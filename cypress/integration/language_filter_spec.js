describe("Given user is on homepage, When user clicks on Language,", () => {
  it("A dropdown will appear with All, English, Malay, Tamil and Mandarin as selectable", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.get("html").invoke("attr", "style", "scroll-behavior: auto");
    cy.get('[data-cy="language-selector"]')
      .scrollIntoView({ offset: { top: 500, left: 0 } })
      .click();
    cy.get('[data-cy="language-selector-choice"]')
      .should("contain", "All")
      .should("contain", "English")
      .should("contain", "Malay")
      .should("contain", "Tamil")
      .should("contain", "Mandarin");
  });

  it("And selects Tamil, the results should filter in only Tamil playlist", () => {
    cy.visit(Cypress.env("baseUrl"));

    cy.get('[data-cy="language-selector"]')
      .scrollIntoView({ offset: { top: 500, left: 0 } })
      .click();
    cy.get('[data-cy="language-selector-choice"]')
      .contains("Tamil")
      .click({ force: true });

    cy.get('[data-cy="playlist-card"]')
      .first()
      .should("contain", "Tamil");
  });
});

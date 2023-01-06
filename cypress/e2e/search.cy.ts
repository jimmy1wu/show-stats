/// <reference types="cypress" />

context("search", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("can search for a tv show", () => {
    cy.intercept("/api/search?query=game", { fixture: "search-game.json" }).as("search");

    cy.get('[data-test-id="search-text"]').type("game");
    cy.get('[data-test-id="search-submit"]').click();

    cy.wait("@search");

    cy.get('[data-test-id="search-results"] h1').contains("game");
    cy.get('[data-test-id="search-results"] div').should("not.include.text", "No results");

    cy.get('[data-test-id="tv-show-card"]').should("have.length", 4);

    cy.get('[data-test-id="tv-show-card"]').first().click();

    cy.url().should("include", "/tt0944947");
  });

  it("displays a message when no results are found", () => {
    cy.intercept("/api/search?query=doesnotexist", { fixture: "search-empty.json" }).as("search");

    cy.get('[data-test-id="search-text"]').type("doesnotexist");
    cy.get('[data-test-id="search-submit"]').click();

    cy.wait("@search");

    cy.get('[data-test-id="search-results"] h1').contains("doesnotexist");
    cy.get('[data-test-id="search-results"] div').contains("No results");

    cy.get('[data-test-id="tv-show-card"]').should("have.length", 0);
  });
});

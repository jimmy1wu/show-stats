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
    cy.intercept("/api/search?query=doesnotexist", { body: [] }).as("search");

    cy.get('[data-test-id="search-text"]').type("doesnotexist");
    cy.get('[data-test-id="search-submit"]').click();

    cy.wait("@search");

    cy.get('[data-test-id="search-results"] h1').contains("doesnotexist");
    cy.get('[data-test-id="search-results"] div').contains("No results");

    cy.get('[data-test-id="tv-show-card"]').should("have.length", 0);
  });

  it("displays the error message when there was a server error", () => {
    const title = "Server error!";
    const message = "Something unexpected happened.";

    cy.intercept("/api/search?query=asdf", {
      statusCode: 500,
      body: {
        title,
        message,
      },
    }).as("search");

    cy.get('[data-test-id="search-text"]').type("asdf");
    cy.get('[data-test-id="search-submit"]').click();

    cy.wait("@search");

    cy.get('[data-test-id="error-message"] h3').contains(title);
    cy.get('[data-test-id="error-message"] p').contains(message);
  });

  it("displays the default error message when the server error is not in the expected format", () => {
    cy.intercept("/api/search?query=asdf", {
      statusCode: 500,
      body: "<p>unexpected format</p>",
    }).as("search");

    cy.get('[data-test-id="search-text"]').type("asdf");
    cy.get('[data-test-id="search-submit"]').click();

    cy.wait("@search");

    cy.get('[data-test-id="error-message"] h3').contains("Oh no!");
    cy.get('[data-test-id="error-message"] p').contains("Something went wrong.");
  });
});

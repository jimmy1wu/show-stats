/// <reference types="cypress" />

context("show", () => {
  it("should display the show's stats", () => {
    const title = "Game of Thrones";
    const seasons = 8;
    const avgRating = "8.7/10";
    const bestEpisode = "The Rains of Castamere";
    const worstEpisode = "The Iron Throne";

    cy.intercept("/api/get-show?imdbID=tt0944947", { fixture: "show-tt0944947.json" }).as(
      "getShow"
    );

    cy.visit("/tt0944947");

    cy.wait("@getShow");

    cy.get('[data-test-id="show-title"]').contains(title);
    cy.get('[data-test-id="show-season-button"]').should("have.length", 1 + seasons);
    cy.get(".recharts-responsive-container").should("be.visible");

    cy.get('[data-test-id="show-avg-rating"]').contains(avgRating);
    cy.get('[data-test-id="show-episode-list"]')
      .eq(0)
      .within(() => {
        cy.get("li").eq(0).contains(bestEpisode);
      });
    cy.get('[data-test-id="show-episode-list"]')
      .eq(1)
      .within(() => {
        cy.get("li").eq(0).contains(worstEpisode);
      });
  });

  it("displays the error message when there was a server error", () => {
    const title = "Not found!";
    const message = "Could not find show with IMDb ID doesnotexist.";

    cy.intercept("/api/get-show?imdbID=doesnotexist", {
      statusCode: 404,
      body: {
        title,
        message,
      },
    }).as("getShow");

    cy.visit("/doesnotexist");

    cy.wait("@getShow");

    cy.get('[data-test-id="error-message"] h3').contains(title);
    cy.get('[data-test-id="error-message"] p').contains(message);
  });
});

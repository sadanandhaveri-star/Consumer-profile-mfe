/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login
       * @example cy.login('user@example.com', 'password')
       */
      login(email: string, password: string): Chainable<void>;

      /**
       * Custom command to get element by data-testid
       * @example cy.getByTestId('submit-button')
       */
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// Custom command to get elements by data-testid
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// Custom command for login (example)
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.getByTestId('input-email').type(email);
    cy.getByTestId('input-password').type(password);
    cy.getByTestId('login-button').click();
    cy.url().should('not.include', '/login');
  });
});

export {};

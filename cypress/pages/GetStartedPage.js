export default class GetStartedPage {
  defaultPageShouldBe () {
    cy.url().should('include', '/get-started')
  }
}

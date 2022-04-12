export default class LoginPage {
    title = {
      selector: '#auth-wrapper-form-container h1',
      text: 'Sign in to Argyle'
    }

    email = '#sign-in-email-input';
    password = '#sign-in-password-input';
    signIn = 'button[type="submit"]'
    logo = 'svg[data-hook="argyle-marketing-logo"]'
    incorrectCredentialsMessage = 'Incorrect email or password'

    go () {
      cy.visit('/sign-in')
    }

    fillForm (email, password) {
      cy.get(this.email).type(email)
      cy.get(this.password).type(password)
    }

    submit () {
      cy.get(this.signIn).click()
    }

    defaultPageShouldBe () {
      cy.get(this.logo).should('be.visible')
      cy.get(this.title.selector).should('have.text', this.title.text)
    }

    invalidCredentialsMessageShouldBe () {
      cy.get('#sign-in-password-input-helper').should('have.text', this.incorrectCredentialsMessage)
    }
}

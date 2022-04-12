export default class LinkPage {
    title = {
      selector: 'h1[data-hook="emulator-header"]',
      mainText: 'Link Emulator',
      subText: 'Explore the Argyle Link UI and connect sample accounts using the provided sandbox credentials'
    }

    introTitle = {
      selector: 'span[data-hook="intro-title"]',
      text: 'Argyle Recruiting (Sandbox) has partnered with Argyle to verify your income'
    }

    continueButton = 'button[data-hook="continue-button"]'

    connectButton = 'button[data-hook="connect-button"]'

    mfaCode = 'input[data-hook="mfa-code-input"]'

    incomeSource = {
      searchInput: 'input[data-hook="search-input"]',
      partnerItemName: 'span[data-hook="partner-item-name"]'
    }

    username = 'input[name="username"]'
    password = 'input[name="password"]'

    successLinkScreen = {
      message: 'span[data-hook="connection-title"]',
      closeButton: 'button[data-hook="success-close"]'
    }

    invalidCredentialsMessage = 'div[data-hook="login-error-message"] span'
    invalidMfaCodeMessage = 'div[data-hook="mfa-error-message"] span'

    go () {
      cy.visit('/link')
    }

    defaultPageShouldBe () {
      cy.get(this.title.selector).should('contain.text', this.title.mainText).and('contain.text', this.title.subText)
    }

    continue () {
      cy.get(this.introTitle.selector).should('have.text', this.introTitle.text)
      cy.get(this.continueButton).click()
    }

    findIncomeSourceUsingSearch (employer) {
      cy.get(this.incomeSource.searchInput).type(employer)
      cy.contains(this.incomeSource.partnerItemName, employer).click()
    }

    clickCategory (category) {
      // categories Popular Employer Payroll Gig
      cy.contains('div[data-hook="suggestions-category"]', category).click()
    }

    clickSuggestion (suggestion) {
      cy.contains('div[data-hook="suggestions-item"]', suggestion).click()
    }

    findIncomeSourceUsingSuggestions (category, suggestion) {
      this.clickCategory(category)
      this.clickSuggestion(suggestion)
    }

    fillForm (username, password) {
      cy.get(this.username).type(username)
      cy.get(this.password).type(password)
    }

    connect () {
      cy.get(this.connectButton).click()
    }

    fillMfaCode (code) {
      cy.get(this.mfaCode, { timeout: 10000 }).type(code) // operation usually doesn't take more than 10 seconds
    }

    successfulAccountLinkedScreenShouldBe (message) {
      cy.get(this.successLinkScreen.message).should('have.text', message)
      cy.get(this.successLinkScreen.closeButton).click()
    }

    invalidCredentialsMessageShouldBe (message) {
      cy.get(this.invalidCredentialsMessage).should('have.text', message)
    }

    invalidMfaCodeMessageShouldBe (message) {
      cy.get(this.invalidMfaCodeMessage).should('have.text', message)
    }
}

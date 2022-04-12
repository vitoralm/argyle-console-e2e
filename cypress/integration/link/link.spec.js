import LinkPage from '../../pages/LinkPage'
import LoginPage from '../../pages/LoginPage'
import GetStartedPage from '../../pages/GetStartedPage'

describe('link tests', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/auth/sign-in').as('postSignIn')

    const loginPage = new LoginPage()
    const user = {
      email: 'alin+qa@argyle.com',
      password: 'Password123!@#'
    }
    loginPage.go()
    loginPage.fillForm(user.email, user.password)
    loginPage.submit()
    cy.wait('@postSignIn')
    const getStartedPage = new GetStartedPage()
    getStartedPage.defaultPageShouldBe()
  })

  it('should make a valid link using Bob Jones credentials using income search', () => {
    const linkPage = new LinkPage()
    linkPage.go()
    linkPage.defaultPageShouldBe()
    linkPage.continue()

    const bobJonesCredentials = {
      email: 'test1@argyle.com',
      password: 'passgood',
      smsCode: '8081',
      employer: 'Uber'
    }

    linkPage.findIncomeSourceUsingSearch(bobJonesCredentials.employer)
    linkPage.fillForm(bobJonesCredentials.email, bobJonesCredentials.password)
    linkPage.connect()
    linkPage.fillMfaCode(bobJonesCredentials.smsCode)
    linkPage.connect()
    linkPage.successfulAccountLinkedScreenShouldBe('Your Uber account is connected')
  })

  it('should make a valid link using Bob Jones credentials using suggestions', () => {
    const linkPage = new LinkPage()
    linkPage.go()
    linkPage.defaultPageShouldBe()
    linkPage.continue()

    const bobJonesCredentials = {
      email: 'test1@argyle.com',
      password: 'passgood',
      smsCode: '8081',
      employer: 'Uber'
    }

    linkPage.findIncomeSourceUsingSuggestions('Gig', bobJonesCredentials.employer)
    linkPage.fillForm(bobJonesCredentials.email, bobJonesCredentials.password)
    linkPage.connect()
    linkPage.fillMfaCode(bobJonesCredentials.smsCode)
    linkPage.connect()
    linkPage.successfulAccountLinkedScreenShouldBe('Your Uber account IS connected')
  })

  it('should try a invalid link using Bob Jones credentials', () => {
    const linkPage = new LinkPage()
    linkPage.go()
    linkPage.defaultPageShouldBe()
    linkPage.continue()

    const bobJonesCredentials = {
      email: 'test1@argyle.com',
      password: 'passgood',
      smsCode: '8081',
      employer: 'Amazon'
    }

    linkPage.findIncomeSourceUsingSearch(bobJonesCredentials.employer)
    linkPage.fillForm(bobJonesCredentials.email, bobJonesCredentials.password)
    linkPage.connect()
    linkPage.invalidCredentialsMessageShouldBe('Invalid credentials. Please try again.')
  })

  it('should try a invalid link using wrong mfa code', () => {
    const linkPage = new LinkPage()
    linkPage.go()
    linkPage.defaultPageShouldBe()
    linkPage.continue()

    const joeBurnamCredentials = {
      email: 'test3@argyle.com',
      password: 'passgood',
      smsCode: '9999',
      employer: 'Uber'
    }

    linkPage.findIncomeSourceUsingSearch(joeBurnamCredentials.employer)
    linkPage.fillForm(joeBurnamCredentials.email, joeBurnamCredentials.password)
    linkPage.connect()
    linkPage.fillMfaCode(joeBurnamCredentials.smsCode)
    linkPage.connect()
    linkPage.invalidMfaCodeMessageShouldBe("The code you've entered is incorrect.")
  })
})

import GetStartedPage from '../../pages/GetStartedPage'
import LoginPage from '../../pages/LoginPage'

describe('login tests', () => {
  before(() => {
    cy.intercept('POST', '**/auth/sign-in').as('postSignIn')
  })

  it('should make a valid login', () => {
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

  it('should make a invalid login using wrong password', () => {
    const loginPage = new LoginPage()
    const user = {
      email: 'alin+qa@argyle.com',
      password: 'Password123'
    }
    loginPage.go()
    loginPage.fillForm(user.email, user.password)
    loginPage.submit()
    loginPage.invalidCredentialsMessageShouldBe()
  })

  it('should make a invalid login using wrong email', () => {
    const loginPage = new LoginPage()
    const user = {
      email: 'qa@argyle.com',
      password: 'Password123!@#'
    }
    loginPage.go()
    loginPage.fillForm(user.email, user.password)
    loginPage.submit()
    loginPage.invalidCredentialsMessageShouldBe()
  })
})

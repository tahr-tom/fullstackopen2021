describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'AAA',
      username: 'aaa',
      password: 'aaa'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('aaa')
      cy.get('#password').type('aaa')
      cy.get('button:submit').click()

      cy.contains('blogs')
      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrongwrongwrong')
      cy.get('#password').type('wrongwrongwrong')
      cy.get('button:submit').click()

      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})
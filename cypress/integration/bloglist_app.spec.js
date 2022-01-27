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
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)') // red color
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', { username: 'aaa', password: 'aaa'})
        .then(({body}) => {
          localStorage.setItem('loggedBlogListAppUser', JSON.stringify(body))
          cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Blog from cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://www.cypress.io/')
      cy.get('.formDiv > * button').click()
      cy.get('.message').should('contain', 'Blog from cypress by Cypress added')
      cy.get('.message').should('have.css', 'color', 'rgb(0, 128, 0)') // green color
    })
  })
})
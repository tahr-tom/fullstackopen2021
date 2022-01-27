describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      name: 'AAA',
      username: 'aaa',
      password: 'aaa'
    })
    cy.createUser({
      name: 'BBB',
      username: 'bbb',
      password: 'bbb'
    })
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
      cy.login({ username: 'aaa', password: 'aaa' })
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

    describe('and some blogs exist', function() {
      beforeEach(function() {
        cy.login({ username: 'aaa', password: 'aaa'})
        cy.createBlog({ title: 'Some blog title', author: 'Cypress', url: 'cypress.example' })
        cy.login({ username: 'bbb', password: 'bbb'})
        cy.createBlog({ title: 'Some blog title2', author: 'Cypress42', url: 'cypress.com' })
      })

      it('it can be liked', function() {
        cy.contains('Some blog title2').parent().contains('show').as('showButton')
        cy.get('@showButton').click()
        cy.contains('Some blog title2').parent().contains('like').as('likeButton')
        cy.get('@likeButton').click()
        cy.contains('likes 1')
      })

      it('it can be deleted by its creator', function() {
        cy.login({ username: 'aaa', password: 'aaa'})
        cy.contains('Some blog title').parent().contains('show').as('showButton')
        cy.get('@showButton').click()
        cy.contains('Some blog title').parent().contains('remove').as('removeButton')
        cy.get('@removeButton').click()
      })

      it('it cannot be deleted other users(non creator)', function() {
        cy.login({ username: 'bbb', password: 'bbb'})
        cy.contains('Some blog title').parent().contains('show').as('showButton')
        cy.get('@showButton').click()
        cy.contains('Some blog title').parent().contains('remove').should('not.exist')
      })
    })
  })
})
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
        cy.login({ username: 'aaa', password: 'aaa' })
        cy.createBlog({ title: 'Some blog title', author: 'Cypress', url: 'cypress.example' })
        cy.login({ username: 'bbb', password: 'bbb' })
        cy.createBlog({ title: 'Some blog title2', author: 'Cypress42', url: 'cypress.com' })
        cy.createBlog({ title: 'Some blog title3', author: 'Cypress43', url: 'cypress.com' })
      })

      it('can be liked', function() {
        cy.contains('Some blog title2').parent().contains('show').as('showButton')
        cy.get('@showButton').click()
        cy.contains('Some blog title2').parent().contains('like').as('likeButton')
        cy.get('@likeButton').click()
        cy.contains('likes 1')
      })

      it('can be deleted by its creator', function() {
        cy.login({ username: 'aaa', password: 'aaa' })
        cy.contains('Some blog title').parent().contains('show').as('showButton')
        cy.get('@showButton').click()
        cy.contains('Some blog title').parent().contains('remove').as('removeButton')
        cy.get('@removeButton').click()
      })

      it('cannot be deleted other users(non creator)', function() {
        cy.login({ username: 'bbb', password: 'bbb' })
        cy.contains('Some blog title').parent().contains('show').as('showButton')
        cy.get('@showButton').click()
        cy.contains('Some blog title').parent().contains('remove').should('not.exist')
      })

      it('they are ordered by likes with most likes being first', function() {
        cy.contains('Some blog title').parent().contains('show').as('showButton1')
        cy.get('@showButton1').click()
        cy.contains('Some blog title').parent().contains('like').as('likeButton1')
        cy.get('@likeButton1').click()
        cy.wait(500)

        cy.contains('Some blog title2').parent().contains('show').as('showButton2')
        cy.get('@showButton2').click()
        cy.contains('Some blog title2').parent().contains('like').as('likeButton2')
        cy.get('@likeButton2').click()
        cy.wait(500)
        cy.get('@likeButton2').click()
        cy.wait(500)

        cy.contains('Some blog title3').parent().contains('show').as('showButton3')
        cy.get('@showButton3', ).click()
        cy.contains('Some blog title3').parent().contains('like').as('likeButton3')
        cy.get('@likeButton3').click()
        cy.wait(500)
        cy.get('@likeButton3').click()
        cy.wait(500)
        cy.get('@likeButton3').click()

        cy.wait(500)
        cy.get('.blog').eq(0).contains('Some blog title3')
        cy.get('.blog').eq(1).contains('Some blog title2')
        cy.get('.blog').eq(2).contains('Some blog title')
      })
    })
  })
})
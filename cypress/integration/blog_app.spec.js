describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Mike Tran',
      username: 'miketran238',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })


  it('front page can be opened', function() {
    cy.contains('Blog')
  })

  it('user can login', function () {
    cy.get('#username').type('miketran238')
    cy.get('#password').type('root')
    cy.get('#login-button').click()
    cy.contains('Mike Tran logged-in')
  })

  it('login fails with wrong password', function() {
    cy.get('#username').type('miketran238')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('Wrong credentials')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'miketran238', password: 'root' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#likes').type('2')
      cy.get('#url').type('cypress.com')
      cy.contains('save').click()
      cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a blog created by cypress',
          author: 'Cypress',
          likes: '2',
          url: 'Cypress.com'
        })
      })
    })


  })
})
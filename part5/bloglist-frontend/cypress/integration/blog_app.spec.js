describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        
        cy.request('POST', 'http://localhost:3001/api/users', {
            "username": "millie",
            "name": "Millie Jones",
            "password": "passwordmillie"
        })
   
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Blog List')
        cy.contains('Login')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.login({ username: 'millie', password: 'passwordmillie' })
            cy.contains('Hello, Millie Jones!')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.contains('login').click()
            cy.contains('invalid username or password')
        })
    }) 
})
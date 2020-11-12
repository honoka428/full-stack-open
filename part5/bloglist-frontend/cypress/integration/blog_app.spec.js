describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        
        cy.request('POST', 'http://localhost:3001/api/users', {
            "username": "millie",
            "name": "Millie Jones",
            "password": "passwordmillie"
        })

        cy.request('POST', 'http://localhost:3001/api/users', {
            "username": "alex",
            "name": "Alex Smith",
            "password": "passwordalex"
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

    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'millie', password: 'passwordmillie' })
        })
    
        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('Sample Title')
            cy.get('#author').type('Mr. Test')
            cy.get('#url').type('www.test.com')
            cy.contains('create').click()

            cy.contains('Sample Title')
        })
    })

    describe.only('When logged in and own blog exists', function() {
        beforeEach(function() {
            cy.login({ username: 'millie', password: 'passwordmillie' })
            cy.contains('new blog').click()
            cy.get('#title').type('Sample Title')
            cy.get('#author').type('Mr. Test')
            cy.get('#url').type('www.test.com')
            cy.contains('create').click()
        })
    
        it('A blog can be liked', function() {
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('likes: 1')
        })

        it('A blog can be deleted', function() {
            cy.contains('view').click()
            cy.contains('delete').click()
            cy.contains('Successfully deleted blog.').click()
        })        
    })

    describe.only('When logged in and own blog doesnt exist', function() {
        beforeEach(function() {
            cy.login({ username: 'millie', password: 'passwordmillie' })
            cy.contains('new blog').click()
            cy.get('#title').type('Sample Title')
            cy.get('#author').type('Mr. Test')
            cy.get('#url').type('www.test.com')
            cy.contains('create').click()
        })

        it('A blog by another cannot be deleted', function() {
            cy.contains('logout').click()
            cy.login({ username: 'alex', password: 'passwordalex' })
            cy.contains('view').click()
            cy.should('not.contain', 'delete')
        })
    })

    describe.only('When logged in and there are multiple blogs', function() {
        beforeEach(function() {
            cy.login({ username: 'millie', password: 'passwordmillie' })
            cy.createBlog({title:'MostLikes', author:'Mr. Test', url:'www.test.com'})
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('like').click()
            
            cy.wait(5000)
            cy.createBlog({title:'LessLikes', author:'Mrs. Test', url:'www.dfsd.com'})
        })

        it('Blogs are ordered by number of likes', function() {
            cy.get('.blogList').first().then(() => {
                cy.contains('LessLikes')
            })
        })
    })            
})
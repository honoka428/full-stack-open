const blogsRouter = require("../controllers/blogs")
const logger = require('./logger')

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    var sum = 0

    blogs.forEach(blog => {
        sum += blog.likes
    })

    return sum
}

const favoriteBlog = (blogs) => {
    var topLikes = 0
    var mostLikedBlog = {}
    
    blogs.forEach(blog => {
        if(blog.likes > topLikes) {
            mostLikedBlog = blog
            topLikes = blog.likes
        }
    })

    return mostLikedBlog
}

const mostBlogs = (blogs) => {
    var existingAuthors = []
    var bloggerTracker = []

    blogs.forEach(blog => {
        if (!existingAuthors.includes(blog.author)) {
            bloggerTracker.push({author: blog.author, blogs: 1})
            existingAuthors.push(blog.author)
        } else {
            let i = bloggerTracker.map(b => {return b.author}).indexOf(blog.author)
            bloggerTracker[i].blogs = bloggerTracker[i].blogs + 1
        }
    })

    var highestBlogCount = 0
    var bloggerInfo = {}

    bloggerTracker.forEach(blogger => {
        if (blogger.blogs > highestBlogCount) {
            bloggerInfo = blogger
            highestBlogCount = blogger.blogs
        } else return
    })
    
    return bloggerInfo
}

// const dummyblogs = [
//     { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
//     { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
//     { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
//     { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
//     { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
//     { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
//   ]

// mostBlogs(dummyblogs)

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
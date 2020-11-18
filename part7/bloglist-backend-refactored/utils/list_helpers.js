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
    var authorTracker = []

    blogs.forEach(blog => {
        if (!existingAuthors.includes(blog.author)) {
            authorTracker.push({author: blog.author, blogs: 1})
            existingAuthors.push(blog.author)
        } else {
            let i = authorTracker.map(b => {return b.author}).indexOf(blog.author)
            authorTracker[i].blogs = authorTracker[i].blogs + 1
        }
    })

    var highestBlogCount = 0
    var bloggerInfo = {}

    authorTracker.forEach(blogger => {
        if (blogger.blogs > highestBlogCount) {
            bloggerInfo = blogger
            highestBlogCount = blogger.blogs
        } else return
    })
    
    return bloggerInfo
}

const mostLiked = (blogs) => {
    var existingAuthors = []
    var authorTracker = []

    blogs.forEach(blog => {
        if (!existingAuthors.includes(blog.author)) {
            authorTracker.push({author: blog.author, likes: blog.likes})
            existingAuthors.push(blog.author)
        } else {
            let i = authorTracker.map(b => {return b.author}).indexOf(blog.author)
            authorTracker[i].likes = authorTracker[i].likes + blog.likes
        }
    })

    var highestLikesCount = 0
    var mostLikedAuthor = {}

    authorTracker.forEach(author => {
        if (author.likes > highestLikesCount) {
            mostLikedAuthor = author
            highestLikesCount = author.likes
        } else return
    })

    return mostLikedAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLiked
}
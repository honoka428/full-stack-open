const blogsRouter = require("../controllers/blogs")

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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
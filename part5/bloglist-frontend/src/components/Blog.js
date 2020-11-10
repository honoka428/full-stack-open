import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {

  const [ detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetailsView = () => {
    setDetailsVisible(!detailsVisible)
  }

  const blogNameOnly = () =>
    <div>
      {blog.title} <button onClick={toggleDetailsView}> view </button>
    </div>

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    likeBlog({
      "user": blog.user,
      "title": blog.title,
      "author": blog.author,
      "url": blog.url,
      "likes": blog.likes + 1
    })
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}`)) {
      const idToDelete = blog.id
      deleteBlog(idToDelete)
    }
  }

  const deleteButton = () => <button onClick={handleDelete}> delete </button>

  const allBlogDetails = () => 
    <div>
      {blog.title} <button onClick={toggleDetailsView}> hide </button> <br/>
      url: {blog.url} <br/>
      author: {blog.author} <br/>
      likes: {blog.likes} <button onClick={handleLike}>like</button> <br/>
      {
        blog.user.id === user.id  // Show delete button only when user is creator of blog
          ? deleteButton()
          : <div></div>
      }
    </div>

  return (
    <div style={blogStyle}>
      { detailsVisible === true
          ? allBlogDetails()
          : blogNameOnly()
      }
    </div>

  )
}

export { Blog }
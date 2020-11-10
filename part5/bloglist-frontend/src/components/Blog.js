import React, { useState } from 'react'

const Blog = ({ blog }) => {

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

  const allBlogDetails = () => 
    <div>
      {blog.title} <button onClick={toggleDetailsView}> hide </button> <br/>
      url: {blog.url} <br/>
      author: {blog.author} <br/>
      likes: {blog.likes} <button>like</button>
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
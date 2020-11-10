import React from 'react'

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

const BlogForm = props => {

  const blogFormDisplay = { display: props.blogFormVisible ? '' : 'none' }
  const newNoteButtonDisplay = { display: props.blogFormVisible ? 'none' : '' }

  return (
    <div>
      <button onClick={() => props.setBlogFormVisible(true)} style={newNoteButtonDisplay}>new note</button>
      <form onSubmit={props.handleCreateBlog} style={blogFormDisplay}>
        <div>
          title
              <input
              type="text"
              value={props.title}
              name="Title"
              onChange={({ target }) => props.setTitle(target.value)}
            /> 
        </div>
        <div>
          author
              <input
              type="text"
              value={props.author}
              name="Author"
              onChange={({ target }) => props.setAuthor(target.value)}
            /> 
        </div>
        <div>
          url
              <input
              type="text"
              value={props.url}
              name="URL"
              onChange={({ target }) => props.setUrl(target.value)}
            /> 
        </div>            
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export { Blog, BlogForm}

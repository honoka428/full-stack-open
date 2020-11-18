import React, { useState } from 'react'
import { toggleOnNotification, toggleOffNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {

  const [ detailsVisible, setDetailsVisible] = useState(false)

  const dispatch = useDispatch()

  const toggleDetailsView = () => {
    setDetailsVisible(!detailsVisible)
  }

  const blogNameOnly = () =>
    <div className={blog.title}>
      {blog.title} <button onClick={toggleDetailsView}> view </button>
    </div>

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async() => {
    const updatedBlog = {
      'user': blog.user,
      'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'likes': blog.likes + 1
    }

    try {
      await blogService.updateOne(updatedBlog)
      
      dispatch(toggleOnNotification({
        type: 'greenError',
        message: `Successfully liked ${updatedBlog.title}`
      }))
    }
    catch(err) {
      console.log(err)
      dispatch(toggleOnNotification({
        type: 'redError',
        message: 'There was a problem liking this blog post.'
      }))
    }
    setTimeout(() => {
      dispatch(toggleOffNotification())
    }, 3000)
  }

  const handleDelete = async() => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}`)) {
      const idToDelete = blog.id

      try {
        await blogService.deleteOne(idToDelete)
        dispatch(toggleOnNotification({
          type: 'greenError',
          message: 'Successfully deleted blog'
        }))
      }
      catch(err){
        console.log(err)
        dispatch(toggleOnNotification({
          type: 'redError',
          message: 'There was a problem deleting your blog post.'
        }))
      }
      setTimeout(() => {
        dispatch(toggleOffNotification())
      }, 3000)
    }
  }

  const deleteButton = () => <button onClick={handleDelete}> delete </button>

  const allBlogDetails = () =>
    <div className='detailsExpanded'>
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
    <div style={blogStyle} className="blog">
      { detailsVisible === true
        ? allBlogDetails()
        : blogNameOnly()
      }
    </div>
  )
}

export { Blog }
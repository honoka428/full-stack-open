import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { toggleOnNotification, toggleOffNotification } from '../reducers/notificationReducer'
import {   useHistory } from 'react-router-dom'

const BlogDetails = ({ match }) => {
  
    const dispatch = useDispatch()
    const history = useHistory()

    const blogs = useSelector(state => state.blog)
    const user = useSelector(state => state.user)
    
    const blog = blogs.find(blog => blog.id === match.params.id)

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
          history.push('/')

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
  
    const deleteButton = () => 
      <div>
        <button onClick={handleDelete}> delete </button>
      </div>
  
    return (
        <div>
            <h2>{blog.title}</h2>
            url: {blog.url} <br/>
            author: {blog.author} <br/>
            likes: {blog.likes} <button onClick={handleLike}>like</button> <br/>
            <p>added by {blog.user.name} </p>

            {
            blog.user.id === user.id  // Show delete button only when user is creator of blog
                ? deleteButton()
                : <div></div>
            }
      </div>
    )
  }
  
export { BlogDetails }
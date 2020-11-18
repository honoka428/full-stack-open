import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { toggleOnNotification, toggleOffNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'


const BlogForm = ({ setVisible, visible }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const token = useSelector(state => state.token)

  const dispatch = useDispatch()

  const addBlog = event => {
    event.preventDefault()

    try{
      createBlog({
        'title': title,
        'author': author,
        'url': url
      }, token, setVisible, visible)

      setTitle('')
      setAuthor('')
      setUrl('')
  
      dispatch(toggleOnNotification({
        type: 'greenError',
        message: 'Successfully created blog post.'
      }))
    }
    catch(err) {
      dispatch(toggleOnNotification({
        type: 'redError',
        message: 'TThere was a problem creating your blog post.'
      }))
      console.log(err)
    }

    setTimeout(() => {
      dispatch(toggleOffNotification())
    }, 2000)
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            id='title'          
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='url'
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export { BlogForm }
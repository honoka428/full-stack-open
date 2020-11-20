import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { toggleOnNotification, toggleOffNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ setVisible, visible }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const token = useSelector(state => {
    return `bearer ${state.user.token}`
  })

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
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            id='title'          
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL:</Form.Label>
          <Form.Control
            id='url'
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button type="submit">create</Button>
      </Form>
    </div>
  )
}

export { BlogForm }
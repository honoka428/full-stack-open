import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { BlogForm } from './BlogForm'

test('clicking create button calls eventhandler', () => {

  const mockHandler = jest.fn()

  const component = render(
    <BlogForm createBlog={mockHandler}/>
  )
  const button = component.getByText('create')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

})

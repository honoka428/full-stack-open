import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { Blog } from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Tester Blog Post',
    author: 'Silvia Monner',
    url: 'www.hsi.com',
    likes: 0
  }

  const component = render(
    <Blog blog={blog}/>
  )

  expect(component.container).toHaveTextContent('Tester Blog Post')
})
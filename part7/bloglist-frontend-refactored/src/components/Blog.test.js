import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

describe('button functionality', () => {
  const blog = {
    user: { username: 'sam', name: 'samuel', id: '234241' },
    title: 'Tester Blog Post',
    author: 'Silvia Monner',
    url: 'www.hsi.com',
    likes: 0,
  }

  const user = { id: '786855' }

  test('expanded view shows all details', () => {
    const component = render(
      <Blog blog={blog} user={user}/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.detailsExpanded')

    expect(div).toHaveTextContent('Tester Blog Post')
    expect(div).toHaveTextContent('author: Silvia Monner')
    expect(div).toHaveTextContent('url: www.hsi.com')
    expect(div).toHaveTextContent('likes: 0')
  })
})
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author, but not its url and likes number by default', () => {

  const user = {
    username: 'aaa',
    password: 'aaa'
  }

  const blog = {
    title: "foo blog",
    author: "Foo Bar",
    url: "http://foo.bar",
    likes: 42,
    user: user
  }

  const component = render(<Blog blog={blog} user={user}/>)

  expect(component.container).toHaveTextContent('foo blog')
  expect(component.container).toHaveTextContent('Foo Bar')

  expect(component.container.querySelector('.blog-details')).toBeNull()
})
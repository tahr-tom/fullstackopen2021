import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author, but not its url and likes number by default', () => {
  const user = {
    username: 'aaa',
    password: 'aaa'
  }

  const blog = {
    title: 'foo blog',
    author: 'Foo Bar',
    url: 'http://foo.bar',
    likes: 42,
    user: user
  }

  const mockHandler = jest.fn()
  const component = render(<Blog blog={blog} user={user} like={mockHandler} remove={mockHandler}/>)

  expect(component.container).toHaveTextContent('foo blog')
  expect(component.container).toHaveTextContent('Foo Bar')

  expect(component.container.querySelector('.blog-details')).toBeNull()
})

test('renders blog details when show button has been clicked', () => {
  const user = {
    username: 'aaa',
    password: 'aaa'
  }

  const blog = {
    title: 'foo blog',
    author: 'Foo Bar',
    url: 'http://foo.bar',
    likes: 42,
    user: user
  }

  const mockHandler = jest.fn()
  const component = render(<Blog blog={blog} user={user} like={mockHandler} remove={mockHandler}/>)

  const button = component.getByText('show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('foo blog')
  expect(component.container).toHaveTextContent('Foo Bar')

  expect(component.container.querySelector('.blog-details')).toBeDefined()
  expect(component.container).toHaveTextContent('http://foo.bar')
  expect(component.container).toHaveTextContent('42')
})

test('click the like button twice calls event handler twice', () => {
  const user = {
    username: 'aaa',
    password: 'aaa'
  }

  const blog = {
    title: 'foo blog',
    author: 'Foo Bar',
    url: 'http://foo.bar',
    likes: 42,
    user: user
  }

  const mockRemoveHandler = jest.fn()
  const mockLikeHandler = jest.fn()
  const component = render(<Blog blog={blog} user={user} like={mockLikeHandler} remove={mockRemoveHandler}/>)

  const showButton = component.getByText('show')
  fireEvent.click(showButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})
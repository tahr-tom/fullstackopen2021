import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test('<NewBlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(<NewBlogForm createBlog={createBlog}/>)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Some Blog Title' }
  })
  fireEvent.change(author, {
    target: { value: 'Alice' }
  })
  fireEvent.change(url, {
    target: { value: 'example.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  const formBody = createBlog.mock.calls[0][0]
  expect(formBody.title).toBe('Some Blog Title')
  expect(formBody.author).toBe('Alice')
  expect(formBody.url).toBe('example.com')
})
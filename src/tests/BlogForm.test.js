import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './../components/BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const user = { _id :'testuser' }
  const component = render(
    <BlogForm createBlog={createBlog} user={user} />
  )

  const inputA = component.container.querySelector('#author')
  const inputT = component.container.querySelector('#title')
  const inputL = component.container.querySelector('#likes')
  const inputU = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputA, {
    target: { value: 'Test author' }
  })
  fireEvent.change(inputT, {
    target: { value: 'Test title' }
  })
  fireEvent.change(inputL, {
    target: { value: '1000' }
  })
  fireEvent.change(inputU, {
    target: { value: 'Test Url' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  //console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls[0][0].author).toBe('Test author' )
  expect(createBlog.mock.calls[0][0].title).toBe('Test title' )
  expect(createBlog.mock.calls[0][0].likes).toBe('1000' )
  expect(createBlog.mock.calls[0][0].url).toBe('Test Url')

})
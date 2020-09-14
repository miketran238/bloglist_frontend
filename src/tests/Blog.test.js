import React from 'react'
import '@testing-library/jest-dom/extend-expect'
//import { render } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import { render, fireEvent } from '@testing-library/react'
import Blog from './../components/Blog'

test('renders title correctly', () => {
  const blog = {
    title: 'A secret',
    author: 'Annonymous',
    url: 'dontask.true.com',
    likes: 10
  }

  const component = render(
    <Blog blog={blog} />
  )

  //component.debug()
  //Access by css class
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('A secret')
})

test('renders title and author only by default', () => {
  const blog = {
    title: 'A secret',
    author: 'Annonymous',
    url: 'dontask.true.com',
    likes: 10
  }

  const component = render(
    <Blog blog={blog} />
  )

  //component.debug()
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('A secret')
  expect(div).toHaveTextContent('Annonymous')
  expect(div).not.toHaveTextContent('dontask.true.com')
  expect(div).not.toHaveTextContent('10')
})

test('clicking the view button will shows the likes and the url', () => {
  const blog = {
    title: 'A secret',
    author: 'Annonymous',
    url: 'dontask.true.com',
    likes: 10
  }
  //const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)
  //component.debug()
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('dontask.true.com')
  expect(div).toHaveTextContent('10')
})

test('clicking the like button twice will fire the event twice', () => {
  const blog = {
    title: 'A secret',
    author: 'Annonymous',
    url: 'dontask.true.com',
    likes: 10
  }
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} testLike={mockHandler}/>
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)
  component.debug()
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  //component.debug()
  expect(mockHandler.mock.calls).toHaveLength(2)
})
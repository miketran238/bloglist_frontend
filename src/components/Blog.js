import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog }) => 
{
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const detail = () => (
    <Togglable buttonLabel='view'>
      <div style={blogStyle}>
        {blog.title} by {blog.author} <br></br>
        {blog.url} <br></br>
        likes {blog.likes} <button>like </button> <br></br>
      </div>
    </Togglable>
  )
  return (
  <div>
    {blog.title} {blog.author} {detail()}
  </div>
  )
}

export default Blog

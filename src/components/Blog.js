import React, { useState } from 'react'
import blogService from './../services/blogs'

const Blog = ({ blog, user, testLike }) => {
  const [toggle, setToggle] = useState(false)
  const [thisBlog, updateBlog] = useState(blog)
  const [deleted, setDeleted] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginLeft: 2
  }

  const toggleVisible = () => {
    setToggle(!toggle)
  }

  const updateLike = () => {
    const newBlog = { ...thisBlog }
    newBlog.likes++
    blogService.update(newBlog.id, newBlog)
    updateBlog(newBlog)
    testLike() //This is only for testing purpose
  }

  const toDelete = () => {
    setDeleted(true)
    blogService.deleteBlog(thisBlog.id)
  }

  // console.log(thisBlog.user)
  // console.log(user)

  return (
    deleted === true ?
      <></>
      :
      <div style={blogStyle}>
        {
          toggle === true ?
            <li className='blog'>
              {thisBlog.title} by {thisBlog.author} <br></br>
              {thisBlog.url} <br></br>
        likes {thisBlog.likes} <button onClick={updateLike}>like </button> <br></br>
              {
                thisBlog.user !== undefined && user !== undefined && thisBlog.user._id === user._id 
                  ?
                  <button onClick={toDelete}> Delete! </button>
                  :
                  <></>
              }  <button onClick={toggleVisible}> hide </button>
            </li>
            :
            <li className='blog'>
              {thisBlog.title} {thisBlog.author} <button onClick={toggleVisible}> view </button>
            </li>
        }

      </div>
  )
}

export default Blog

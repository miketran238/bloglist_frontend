import React, {useState} from 'react'
import blogService from './../services/blogs'

const Blog = ({ blog, user }) => 
{
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

  const updateLike =() => {
    const newBlog = {...thisBlog}
    newBlog.likes++
    blogService.update(newBlog.id,newBlog)
    updateBlog(newBlog)
  }

  const toDelete = () => {
    setDeleted(true)
    blogService.deleteBlog(thisBlog.id)
  }

  return (
    deleted === true ? 
    <></>
    :
  <div style={blogStyle}>
    {
      toggle === true ? 
      <>
        {thisBlog.title} by {thisBlog.author} <br></br>
        {thisBlog.url} <br></br>
        likes {thisBlog.likes} <button onClick={updateLike}>like </button> <br></br>
        <button onClick={toDelete}> Delete! </button>  <button onClick={toggleVisible}> hide </button>
      </>
      :
      <>

      {thisBlog.title} {thisBlog.author} <button onClick={toggleVisible}> view </button>
      </>
    }

  </div>
  )
}

export default Blog

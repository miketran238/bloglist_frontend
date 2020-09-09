import React, {useState} from 'react'

const Blog = ({ blog }) => 
{
  const [toggle, setToggle] = useState(false)
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
    // blogService.
  }

  console.log(toggle)
  return (
  <div style={blogStyle}>
    {
      toggle === true ? 
      <>
        {blog.title} by {blog.author} <br></br>
        {blog.url} <br></br>
        likes {blog.likes} <button onClick={updateLike}>like </button> <br></br>
        <button> Delete! </button>  <button onClick={toggleVisible}> hide </button>
      </>
      :
      <>

      {blog.title} {blog.author} <button onClick={toggleVisible}> view </button>
      </>
    }

  </div>
  )
}

export default Blog

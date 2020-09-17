//A form to create new blog
import React, { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newLikes, setNewLikes] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }
  const handleNewAuthor = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleNewLikes = (event) => {
    setNewLikes(event.target.value)
  }
  const handleNewUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    if (user === undefined) {
      return
    }
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      likes: newLikes,
      url: newUrl,
      userId: user._id
    })

    setNewAuthor('')
    setNewTitle('')
    setNewLikes('')
    setNewUrl('')
  }

  return (
    <div>
      <h2> Add a new Blog </h2>
      <form onSubmit={addBlog}>
        Title <input value={newTitle} onChange={handleNewTitle} id='title'/> <br></br>
        Author <input value={newAuthor} onChange={handleNewAuthor} id='author'/> <br></br>
        Likes <input value={newLikes} onChange={handleNewLikes} id='likes'/> <br></br>
        Url <input value={newUrl} onChange={handleNewUrl} id='url'/> <br></br>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorMessage from './components/ErrorMessage'
import Notification from './components/Notification'

const App = () => {

  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // const [newBlog, setNewBlog] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newLikes, setNewLikes] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      //console.log(user)
      blogService.setToken(user.token)
      
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification('Successfully Login')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setUsername('')
    setPassword('')
    setNotification('Successfully Logout')
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const addBlog = (event) => {
    event.preventDefault()
    console.log(user)
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      likes: newLikes,
      url: newUrl,
      userId: user._id
    }

    if ( blogObject.title === '' || blogObject.author === '' ) {
      setErrorMessage('Author and title cannot be empty')
      return;
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewAuthor('')
        setNewTitle('')
        setNewLikes('')
        setNewUrl('')
      })

  }
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <div>
      <h2> Add a new Blog </h2>
    <form onSubmit={addBlog}>
      Title <input value={newTitle} onChange={handleNewTitle} /> <br></br>
      Author <input value={newAuthor} onChange={handleNewAuthor} /> <br></br>
      Likes <input value={newLikes} onChange={handleNewLikes} /> <br></br>
      Url <input value={newUrl} onChange={handleNewUrl} /> <br></br>
      <button type="submit">save</button>
    </form>
    </div>
  )

  return (
    <div>
      <h1>Blog List Application</h1>
      <Notification message={notification} />
      <ErrorMessage message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>Log Out</button> <br></br>
          {blogForm()}
          <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </div>
      }
    </div>
  )
}
export default App
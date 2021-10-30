import React, { useState, useEffect, useRef } from 'react'
import { SuccessNotification, ErrorNotification } from './components/Notifications'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import Createblog from './components/Createblog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('login success')
      setTimeout(() => { setSuccessMessage(null) }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    setSuccessMessage('logout success')
    setTimeout(() => { setSuccessMessage(null) }, 5000)
    console.log('logged out')
  }

  const handleAddBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create(blogObject)
      await blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      setSuccessMessage(`a new blog ${blogObject.title} ${blogObject.author} added`)
      setTimeout(() => { setSuccessMessage(null) }, 5000)
    } catch (exception) {
      setErrorMessage('adding blog failed')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleUpdateBlog = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject)
      await blogService.getAll().then(blogs => {
        setBlogs( blogs )
      })
      setSuccessMessage(`blog ${blogObject.title} ${blogObject.author} likes updated`)
      setTimeout(() => { setSuccessMessage(null) }, 5000)
    } catch (exception) {
      setErrorMessage('updating blog failed')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleDeleteBlog = async (id, blogObject) => {
    try {
      await blogService.remove(id)
      await blogService.getAll().then(blogs => {
        setBlogs( blogs )
      })
      setSuccessMessage(`blog ${blogObject.title} ${blogObject.author} deleted`)
      setTimeout(() => { setSuccessMessage(null) }, 5000)
    } catch (exception) {
      setErrorMessage('blog deletion failed')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <SuccessNotification message={successMessage} />
        <ErrorNotification message={errorMessage} />
        <Login username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />
      </div>
    )
  } else {
    return (
      <div>
        <SuccessNotification message={successMessage} />
        <ErrorNotification message={errorMessage} />
        <h2>Blogs</h2>
        <p>{user.name} logged in <Logout handleLogout={handleLogout}/></p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <Createblog createBlog={handleAddBlog}/>
        </Togglable>
        <br></br>
        <div className='blogs'>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={handleUpdateBlog} deleteBlog={handleDeleteBlog} user={user}/>
          )}
        </div>
      </div>
    )
  }
}

export default App
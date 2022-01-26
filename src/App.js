import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedBlogListAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch (error) {
      setError('wrong username or password')
      setTimeout(()=>{
        setError(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListAppUser', JSON.stringify(user))
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {title, author, url}

    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))

    setMessage(`${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(()=>{
      setMessage(null)
    }, 3000)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const like = async (blog) => {
    const returnedBlog = await blogService.like(blog)
    setBlogs(blogs.map(blog => {
      if(blog.id === returnedBlog.id) {
        return returnedBlog
      } else {
        return blog
      }
    }))
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  return (
    user == null ?
      <div>
        <h2>log in to application</h2>
        <Notification message={message} error={error}/>
        <LoginForm 
        username={username}
        password={password}
        handleUsernameChange={({target}) => setUsername(target.value)}
        handlePasswordChange={({target}) => setPassword(target.value)}
        handleSubmit={handleLogin}/> 
      </div>
      :  
      <div>
        <h2>blogs</h2>
        <Notification message={message} error={error}/>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel='create new blog'>
          <NewBlogForm
            title={title}
            author={author}
            url={url}
            handleTitleChange={({target}) => setTitle(target.value)}
            handleAuthorChange={({target}) => setAuthor(target.value)}
            handleUrlChange={({target}) => setUrl(target.value)}
            handleSubmit={addBlog}
          />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} like={() => like(blog)} />
        )}
      </div>
  )
}

export default App
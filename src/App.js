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
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleLogin = async ({username, password}) => {
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      window.localStorage.setItem('loggedBlogListAppUser', JSON.stringify(user))
      blogService.setToken(user.token)      
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

  const createBlog = async blogObject => {
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setMessage(`${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(()=>{
      setMessage(null)
    }, 3000)
    return returnedBlog
  }

  const like = async (blog) => {
    const returnedBlog = await blogService.like(blog)
    setBlogs(blogs
      .map(blog => {
        if(blog.id === returnedBlog.id) {
          return returnedBlog
        } else {
          return blog
        }
      })
      .sort((a, b) => b.likes - a.likes))
  }

  const remove = async (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b=>b.id !== blog.id).sort((a, b)=>b.likes - a.likes))
      } catch (error) {
        setError('Cannot remove blog')
        setTimeout(() => {
          setError(null)
        }, 3000)
      }
    }

  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
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
        handleLogin={handleLogin}/> 
      </div>
      :  
      <div>
        <h2>blogs</h2>
        <Notification message={message} error={error}/>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel='create new blog'>
          <NewBlogForm
            createBlog={createBlog}
          />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} like={() => like(blog)} user={user} remove={() => remove(blog)} />
        )}
      </div>
  )
}

export default App
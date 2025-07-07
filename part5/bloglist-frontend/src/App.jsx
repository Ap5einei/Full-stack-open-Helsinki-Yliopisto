import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import PropTypes from 'prop-types'


const Notification = ({ message }) => {
  if (!message) return null
  return (
    <div style={{
      color: message.type === 'error' ? 'red' : 'green',
      background: '#eee',
      border: `2px solid ${message.type === 'error' ? 'red' : 'green'}`,
      padding: 10,
      marginBottom: 10
    }}>
      {message.text}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (text, type = 'success') => {
    setNotification({ text, type })
    setTimeout(() => setNotification(null), 4000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      notify(`Welcome ${user.name}!`)
    } catch (error) {
      notify('Wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    notify('Logged out')
  }

 const handleLike = async (blog) => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id || blog.user 
  }
  const returnedBlog = await blogService.update(blog.id, updatedBlog)
  setBlogs(blogs.map(b => b.id === blog.id ? { ...returnedBlog, user: blog.user } : b))
}

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      notify(`Blog "${blog.title}" removed`)
    }
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      {user === null
        ? loginForm()
        : <div>
            <p>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </p>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <BlogForm createBlog={async (blogObject) => {
                await blogService.create(blogObject)
                blogService.getAll().then(blogs => setBlogs(blogs))
                blogFormRef.current.toggleVisibility()
                notify(`A new blog "${blogObject.title}" by ${blogObject.author} added`)
              }} />
            </Togglable>
            {blogs
              .slice()
              .sort((a, b) => b.likes - a.likes) 
              .map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleLike={handleLike}
                  handleRemove={handleRemove}
                  user={user}
                />
              )
            }
          </div>
      }
    </div>
  )
}

export default App

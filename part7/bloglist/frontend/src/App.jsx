import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/User'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import { initializeBlogs, likeBlog, deleteBlog, createNewBlog } from './reducers/blogsSlice'
import { showNotification } from './reducers/notificationSlice'
import { setUser, clearUser } from './reducers/userSlice'
import loginService from './services/login'
import blogService from './services/blogs'
import './App.css'


const Navigation = ({ user, handleLogout }) => (
  <nav style={{ marginBottom: 20 }}>
    <Link to="/">blogs</Link>{' '}
    <Link to="/users">users</Link>{' '}
    {user && (
      <>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </>
    )}
  </nav>
)

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)
  const blogFormRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: event.target.Username.value,
        password: event.target.Password.value
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user.token)
      dispatch(showNotification(`Welcome ${user.name}!`))
      navigate('/')
    } catch (error) {
      dispatch(showNotification('Wrong credentials', 4))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
    blogService.setToken(null)
    dispatch(showNotification('Logged out'))
    navigate('/')
  }

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(showNotification(`Liked "${blog.title}"`))
  }

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(showNotification(`Blog "${blog.title}" removed`))
    }
  }

  const addBlog = (blogObject) => {
    dispatch(createNewBlog(blogObject))
    blogFormRef.current.toggleVisibility()
    dispatch(showNotification(`A new blog "${blogObject.title}" by ${blogObject.author} added`))
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" name="Username" />
      </div>
      <div>
        password
        <input type="password" name="Password" />
      </div>
      <button type="submit">login</button>
    </form>
  )

  return (
    <div>
      <h2>Blog App</h2>
      <Notification />
      <Navigation user={user} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={
          user === null ? loginForm() : (
            <div>
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
              </Togglable>
              {blogs
                .slice()
                .sort((a, b) => b.likes - a.likes)
                .map(blog =>
                  <Blog
                    key={blog.id}
                    blog={blog}
                    handleLike={() => handleLike(blog)}
                    handleRemove={() => handleRemove(blog)}
                    user={user}
                  />
                )
              }
            </div>
          )
        } />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
      </Routes>
    </div>
  )
}

export default App

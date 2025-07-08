import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs, likeBlog, deleteBlog, createNewBlog } from './reducers/blogsSlice'
import { showNotification } from './reducers/notificationSlice'
import { setUser, clearUser } from './reducers/userSlice' // jos teet userSlice.js, ks. huomio alla
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user) // jos käytät userSlice.js
  const notification = useSelector(state => state.notification)
  const blogFormRef = useRef()

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
    } catch (error) {
      dispatch(showNotification('Wrong credentials', 4))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
    blogService.setToken(null)
    dispatch(showNotification('Logged out'))
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
      <h2>blogs</h2>
      <Notification />
      {user === null
        ? loginForm()
        : (
          <div>
            <p>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </p>
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
      }
    </div>
  )
}

export default App

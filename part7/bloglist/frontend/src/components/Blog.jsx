import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
  <span>{blog.title}</span> <span>{blog.author}</span>
  <button onClick={() => setVisible(!visible)}>
    {visible ? 'hide' : 'view'}
  </button>
</div>

      {visible &&
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{blog.user && blog.user.name}</div>
          {user && blog.user && user.username === blog.user.username &&
            <button onClick={() => handleRemove(blog)}>delete</button>
          }
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func,
  handleRemove: PropTypes.func,
  user: PropTypes.object
}

export default Blog

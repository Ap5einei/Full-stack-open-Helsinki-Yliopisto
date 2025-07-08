import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { likeBlog, addComment } from '../reducers/blogsSlice'

const BlogDetails = () => {
  const { id } = useParams()
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  if (!blog) return null

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleComment = (e) => {
    e.preventDefault()
    dispatch(addComment(blog.id, comment))
    setComment('')
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user && blog.user.name}</div>
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <input
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments && blog.comments.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
    </div>
  )
}

export default BlogDetails

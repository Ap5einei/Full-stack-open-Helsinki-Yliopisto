import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setBlogs } from '../reducers/blogsSlice'
import blogService from '../services/blogs'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(setBlogs(blogs))
    })
  }, [dispatch])

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id}>
          {blog.title} by {blog.author}
        </div>
      ))}
    </div>
  )
}

export default BlogList

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../middleware/userExtractor')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const user = request.user

    const blog = new Blog({
      ...request.body,
      user: user._id
    })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })

    response.status(201).json(populatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter

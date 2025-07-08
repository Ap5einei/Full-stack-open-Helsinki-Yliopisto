const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../utils/userExtractor')

// Hae kaikki blogit, mukaan käyttäjän tiedot
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

// Luo uusi blogi, vaatii tunnistautumisen
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

// Päivitä blogi (esim. tykkäysten päivitys)
blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, author, url, likes, user } = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes: likes ?? 0, user },
      { new: true, runValidators: true, context: 'query' }
    ).populate('user', { username: 1, name: 1 })

    if (updatedBlog) {
      response.json(updatedBlog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

// Poista blogi, vaatii tunnistautumisen ja omistajuuden tarkistuksen
blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    // Tarkistetaan, että poistaja on blogin omistaja
    if (blog.user.toString() !== request.user._id.toString()) {
      return response.status(401).json({ error: 'Unauthorized: only the creator can delete the blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter

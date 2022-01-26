const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user
  if(!user) {
    return response.status(401).json({ error: 'not authorized to add'})
  }

  const blog = new Blog({...request.body, user: user.id})

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'not authorized to delete' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.likes }, { new: true }).populate('user', {username: 1, name: 1, id: 1})
  response.json(updatedBlog)
})

module.exports = blogsRouter
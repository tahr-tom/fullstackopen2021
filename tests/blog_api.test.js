const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog unique identifier is named id', async () =>{
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'test test test',
    url: 'http://testblog.foo',
    like: 43
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain('new blog')
})

test('default value of likes is 0 if it is missing from the request body', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'test test test',
    url: 'http://testblog.foo',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogToTest = response.body[response.body.length - 1]
  console.log(blogToTest)
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogToTest.likes).toBeDefined()
  expect(blogToTest.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})


const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const getAuthToken = async () => {
  const user = helper.initialUsers[1]

  const loginResponse = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return loginResponse.body.token
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  const users = await helper.createHashAndRemovePasswordFor(helper.initialUsers)
  await User.insertMany(users)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog unique identifier is named id', async () =>{
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('with correct credentials, a valid blog can be added', async () => {
  const token = await getAuthToken()

  const newBlog = {
    title: 'new blog',
    author: 'test test test',
    url: 'http://testblog.foo',
    like: 43
  }

  await api
    .post('/api/blogs')
    .auth(token, { type: 'bearer'} )
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain('new blog')
})

test('without an auth token, a blog cannot be added', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'test test test',
    url: 'http://testblog.foo',
    like: 43
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
  expect(contents).not.toContain('new blog')

})

test('with correct credentials, default value of likes is 0 if it is missing from the request body', async () => {
  const token = await getAuthToken()

  const newBlog = {
    title: 'new blog',
    author: 'test test test',
    url: 'http://testblog.foo',
  }

  await api
    .post('/api/blogs')
    .auth(token, { type: 'bearer'} )
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogToTest = response.body[response.body.length - 1]
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogToTest.likes).toBeDefined()
  expect(blogToTest.likes).toBe(0)
})

test('with correct credentials, 400 is returned when title and url properties are missing', async () => {
  const token = await getAuthToken()

  const newBlog = {
    author: 'test for 400',
  }

  await api
    .post('/api/blogs')
    .auth(token, { type: 'bearer'} )
    .send(newBlog)
    .expect(400)
})

test('with correct credentials, a blog can be deleted if it is created by the request', async () => {
  const token = await getAuthToken()

  const newBlog = {
    title: 'new blog to delete',
    author: 'test test test',
    url: 'http://testblog.foo',
    like: 43
  }

  const response = await api
    .post('/api/blogs')
    .auth(token, { type: 'bearer'} )
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  await api
    .delete(`/api/blogs/${response.body.id}`)
    .auth(token, { type: 'bearer'} )
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const titles = blogsAtEnd.map(b => b.title)

  expect(titles).not.toContain(newBlog.title)
})

test('a blog like property can be updated', async() => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({likes: 24})
    .expect(200)

  const blogAtEnd = await helper.blogsInDb()

  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length)

  expect(updatedBlog.body.likes).toBe(24)
})

afterAll(() => {
  mongoose.connection.close()
})


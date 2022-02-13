const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'blog001',
    author: 'foo',
    url: 'http://example.blog001',
    like: 42
  },
  {
    title: 'blog002',
    author: 'bar',
    url: 'http://example.blog002',
    like: 67
  },
]

const initialUsers =[
  {
    username: 'root',
    name: 'Superuser',
    password: 'toor',
  },
  {
    username: 'aaa',
    name: 'aaa',
    password: 'aaa'
  }
]

const createHashAndRemovePasswordFor = async users => {
  return await Promise.all(users.map(async user => ({
    username: user.username,
    name: user.name,
    passwordHash: await bcrypt.hash(user.password, 10)
  })))
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, initialUsers, usersInDb, createHashAndRemovePasswordFor
}
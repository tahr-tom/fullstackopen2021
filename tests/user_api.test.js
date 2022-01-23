const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({username: 'root', passwordHash})

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: 'blog',
      name: 'Bob',
      password: 'secret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(userAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation failed with proper status code and message if username already taken', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'New root',
      password: 'secret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(userAtStart.length)
  })

  test('creation failed with proper status code and message if username is too short (<3 chars)', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: 'fo',
      name: 'Foo',
      password: 'secret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(userAtStart.length)
  })

  test('creation failed with proper status code and message if password is too short (<3 chars)', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Foo',
      name: 'Foo',
      password: 'fo'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(userAtStart.length)
  })

  test('creation failed with proper status code and message if both username and password are too short (<3 chars)', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: 'fo',
      name: 'Foo',
      password: 'fo'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(userAtStart.length)
  })

  test('creation failed with proper status code and message if username is missing', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Foo',
      password: 'fo'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(userAtStart.length)
  })

  test('creation failed with proper status code and message if password is missing', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: 'fo',
      name: 'Foo',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(userAtStart.length)
  })

  test('creation failed with proper status code and message if both username and password are missing', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Foo',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(userAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
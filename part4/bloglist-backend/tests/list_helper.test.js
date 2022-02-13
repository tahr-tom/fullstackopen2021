const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogs = [
    {
      '_id': '5a422aa71b54a676234d17f8',
      'title': 'Go To Statement Considered Harmful',
      'author': 'Edsger W. Dijkstra',
      'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      'likes': 4,
      '__v': 0
    },
    {
      '_id': '5a422aa71b54a676234d17f8',
      'title': 'Go To Statement Considered Harmful',
      'author': 'Edsger W. Dijkstra',
      'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      'likes': 5,
      '__v': 0
    },
    {
      '_id': '5a422aa71b54a676234d17f8',
      'title': 'Go To Statement Considered Harmful',
      'author': 'Edsger W. Dijkstra',
      'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      'likes': 1,
      '__v': 0
    },
    {
      '_id': '5a422aa71b54a676234d17f8',
      'title': 'Go To Statement Considered Harmful',
      'author': 'Edsger W. Dijkstra',
      'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      'likes': 2,
      '__v': 0
    },
    {
      '_id': '5a422aa71b54a676234d17f8',
      'title': 'Go To Statement Considered Harmful',
      'author': 'Edsger W. Dijkstra',
      'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      'likes': 3,
      '__v': 0
    }
  ]

  test('of empty list is zero', ()=> {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', ()=>{
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(15)
  })
})

describe('favorite blog', ()=> {
  const listWithOneBlog = [
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
  ]

  test('when list has only one blog, return that blog', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })

  const listWithMultipleBlogs = [
    {
      '_id': '5a422aa71b54a676234d17f8',
      'title': 'Go To Statement Considered Harmful',
      'author': 'Edsger W. Dijkstra',
      'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      'likes': 4,
      '__v': 0
    },
    {
      '_id': '5a422aa71b54a676234d17f8',
      'title': 'Go To Statement Considered Harmful',
      'author': 'Edsger W. Dijkstra',
      'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      'likes': 5,
      '__v': 0
    },
    {
      '_id': '5a422aa71b54a676234d17f8',
      'title': 'Go To Statement Considered Harmful',
      'author': 'Edsger W. Dijkstra',
      'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      'likes': 1,
      '__v': 0
    },
    {
      '_id': '5a422aa71b54a676234d17f8',
      'title': 'Go To Statement Considered Harmful',
      'author': 'Edsger W. Dijkstra',
      'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      'likes': 2,
      '__v': 0
    },
    {
      '_id': '5a422aa71b54a676234d17f8',
      'title': 'Go To Statement Considered Harmful',
      'author': 'Edsger W. Dijkstra',
      'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      'likes': 3,
      '__v': 0
    }
  ]

  test('of a bigger list is returning second blog from list', () => {
    expect(listHelper.favoriteBlog(listWithMultipleBlogs)).toEqual(listWithMultipleBlogs[1])
  })
})

describe('most blogs', () => {
  const listOfMultipleBlogs = [
    {
      'author': 'a'
    },
    {
      'author': 'b'
    },
    {
      'author': 'b'
    },
    {
      'author': 'c'
    },
    {
      'author': 'c'
    },
    {
      'author': 'c'
    }
  ]

  test('of multiple blogs with one top blogger should return author c with 3 blogs', () => {
    expect(listHelper.mostBlogs(listOfMultipleBlogs)).toEqual({ author: 'c', blogs: 3 })
  })
})

describe('most likes', () => {
  const listOfMultipleBlogs = [
    {
      'author': 'a',
      'likes': 5
    },
    {
      'author': 'a',
      'likes': 1
    },
    {
      'author': 'b',
      'likes': 2
    },
    {
      'author': 'b',
      'likes': 3
    },
    {
      'author': 'c',
      'likes': 1
    },
    {
      'author': 'c',
      'likes': 2
    },
  ]

  test('of multiple blogs with one top blogger should return author a with 6 likes', () => {
    expect(listHelper.mostLikes(listOfMultipleBlogs)).toEqual({ author: 'a', likes: 6 })
  })
})
const _ = require('lodash')


const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, currentBlog) => acc + currentBlog.likes, 0) 
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  return _(blogs)
    .groupBy('author')
    .map((val, key) => ({
      'author': key,
      'blogs': val.length
    }))
    .maxBy('blogs')
}

const mostLikes = (blogs) => {
  return _(blogs)
    .groupBy('author')
    .map((val, key) => ({
      'author': key,
      'likes': _.sumBy(val, 'likes')
    }))
    .maxBy('likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
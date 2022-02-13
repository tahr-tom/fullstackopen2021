import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async blogToLike => {
  const config = {
    headers: { Authorization: token },
  }

  const updatedBlog = {
    user: blogToLike.user.id,
    likes: blogToLike.likes + 1,
    author: blogToLike.author,
    title: blogToLike.title,
    url: blogToLike.url
  }

  const response = await axios.put(`${baseUrl}/${blogToLike.id}`, updatedBlog, config)
  return response.data
}

const remove = async blogId => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const exportedObject = { getAll, create, setToken, like, remove }
export default exportedObject
import { React, useState } from 'react'

const Blog = ({ blog, like, user, remove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const isBlogAddedByUser =  blog.user.username === user.username

  return (
    <div style={blogStyle} className='blog'>
      <p>{blog.title} {blog.author} <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'show' }</button></p>
      {showDetails &&
      <div className='blog-details'>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={like}>like</button></p>
        <p>{blog.user.name}</p>
        {isBlogAddedByUser && <button onClick={remove}>remove</button>}
      </div>
      }

    </div>
  )
}

export default Blog
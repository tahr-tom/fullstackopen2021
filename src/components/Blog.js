import { useState } from 'react';

const Blog = ({blog, like}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false);

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
  <div style={blogStyle}>
    <p>{blog.title} {blog.author} <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'show' }</button></p>
    {showDetails &&
      <div>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={like}>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    }  

  </div>  
  )
}

export default Blog
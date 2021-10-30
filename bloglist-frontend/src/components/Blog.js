import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleUpdateBlog = async (event) => {
    event.preventDefault()
    await updateBlog(blog.id, { title: blog.title, author: blog.author, url: blog.url, likes: blog.likes + 1, user: blog.user.id })
  }

  const handleDeleteBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      await deleteBlog(blog.id, { title: blog.title, author: blog.author })
    }
  }

  return (

    <div className='blog' style={blogStyle}>
      <div style={hideWhenVisible}>
        <p className='titleAuth' onClick={toggleVisibility}>{blog.title} {blog.author} <button onClick={toggleVisibility}>show</button></p>
      </div>
      <div style={showWhenVisible}>
        <p className='titleAuth' onClick={toggleVisibility}>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></p>
        <p className='url'>{blog.url}</p>
        <p className='like'>likes {blog.likes} <button id="like-button" onClick={handleUpdateBlog}>like</button></p>
        <p className='user'>{blog.user.name}</p>
        {blog.user.username === user.username &&
        <button id="delete-button" onClick={handleDeleteBlog}>delete</button>
        }
      </div>
    </div>

  )}

export default Blog
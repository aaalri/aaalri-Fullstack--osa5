import React, { useState } from 'react'

const Login = (props) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const handleAddBlog = async (event) => {
    event.preventDefault()
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    await props.createBlog({ title: newTitle, author: newAuthor, url: newUrl })
  }

  return (
    <form onSubmit={handleAddBlog}>
      <h2> Create blog </h2>
      <p>Title: <input
        id="title"
        value={newTitle}
        onChange={({ target }) => setNewTitle(target.value)}
      /></p>
      <p>Author: <input
        id="author"
        value={newAuthor}
        onChange={({ target }) => setNewAuthor(target.value)}
      /></p>
      <p>Url: <input
        id="url"
        value={newUrl}
        onChange={({ target }) => setNewUrl(target.value)}
      /></p>
      <button id="create-blog" type="submit">create</button>
    </form>
  )
}

export default Login
import { useState } from 'react'
import { useBlogsContext } from '../hooks/useBlogContext'

const BlogForm = () => {
  const {dispatch} = useBlogsContext()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [body, setbody] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setemptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const blog = {title, author, body}
    
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setemptyFields(json.emptyFields)
    }
    if (response.ok) {
      setemptyFields([])
      setError(null)
      setTitle('')
      setAuthor('')
      setbody('')
      console.log('new blog added:', json)
      dispatch({type: 'CREATE_BLOG', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Blog</h3>

      <label>Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Author (code name):</label>
      <input 
        type="text" 
        onChange={(e) => setAuthor(e.target.value)} 
        value={author}
        className={emptyFields.includes('author') ? 'error' : ''}
      />

      <label>Body Text:</label>
      <input 
        type="text" 
        onChange={(e) => setbody(e.target.value)} 
        value={body} 
        className={emptyFields.includes('body') ? 'error' : ''}
      />

      <button>Add Blog</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default BlogForm
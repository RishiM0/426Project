import {useEffect} from 'react'
import { useBlogsContext } from '../hooks/useBlogContext'

import BlogDetails from '../components/blogDetails'
import BlogForm from '../components/BlogForm'

const Home = () => {
    const {blogs, dispatch} = useBlogsContext()
  
    useEffect(() => {
      const fetchBlogs = async () => {
        const response = await fetch('/api/blogs')
        const json = await response.json()
  
        if (response.ok) {
            dispatch({type:'SET_BLOGS', payload: json})
        }
      }
  
      fetchBlogs()
    }, [dispatch])
  
    return (
      <div className="home">
        <div className="workouts">
          {blogs && blogs.map(blog => (
            <BlogDetails blog={blog} key={blog._id} />
          ))}
        </div>
        <BlogForm></BlogForm>
      </div>
    )
  }

export default Home
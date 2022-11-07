import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Post from '../components/Post'
import { getSinglePost } from '../features/post/postSlice'

function SinglePost() {
    
    const {post, message, comment} = useSelector((state)=>state.post)
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(() => {
            dispatch(getSinglePost(id))
    }, [id, message, comment])

  return (
    <div className='w-full flex justify-center mb-5'>
        {post && post.post && <Post post={post} />}
    </div>
  )
}

export default SinglePost
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'
import { getHomePagePosts } from '../features/post/postSlice'
function NewsPost() {
  const {posts, post, message, comment} = useSelector((state)=>state.post)
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(getHomePagePosts())
  },[post, message, comment])
  return (
   <>
        <div className='w-full flex justify-center p-10'>
          <div>
            {posts && !posts.message && posts.map((post, index)=>(
              <Post key={index} post={post} />
            ))}
                 
                   </div>
        </div>
   </>
  )
}

export default NewsPost
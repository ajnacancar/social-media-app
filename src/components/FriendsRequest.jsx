import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {acceptrequest, declineRequest, getRequests} from '../features/friends-request/requestSlice'
import {ReactSpinner} from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';
import {AiFillCheckCircle, AiFillCloseCircle} from 'react-icons/ai'
function FriendsRequest() {
  const {requests, message, isLoading} = useSelector((state)=>state.request)
  const dispatch = useDispatch()

  useEffect(()=>{
        dispatch(getRequests())
  },[message])

  const acceptRequest = (id) => {
      dispatch(acceptrequest(id))
  }

  const requestDecline = (id) => {
    dispatch(declineRequest(id))
}
  return (
    <>
    <h1>Friendship requests</h1>
    {isLoading ? <ReactSpinner /> : <>
        {requests && requests.length > 0 && requests.map((request, index)=>(
        <div key={index}>  {request.status === 'pending' && <div  className='w-full flex items-center justify-between mt-5'>
            <div className='w-[70%]'>
              <p>{request.user_sent_req_firstname} {request.user_sent_req_lastname}</p>
            </div>
              <div className='w-[30%] flex items-center justify-between'>
                <AiFillCheckCircle onClick={()=>acceptRequest(request.id)} className='w-7 h-7 text-green-500 cursor-pointer' />
                <AiFillCloseCircle onClick={()=>requestDecline(request.id)} className='w-7 h-7 text-red-500 cursor-pointer' />
              </div>
          </div>} </div>
        ))}


        {requests && requests.message && <p>{requests.message}</p>}
    </>}
    </>
  )
}

export default FriendsRequest
import React from 'react'
import person from "../assets/profile-3.jpg";
import Moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { deleteComemnt } from '../features/post/postSlice';
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

function Comment({comment}) {
  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const commentDelete = (id, e) =>{
    e.preventDefault()
      dispatch(deleteComemnt(id))
  }
  return (
    <>
        <div className='bg-zinc-200/50 p-2 rounded-lg mt-5'>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex items-center">
            <img src={comment.user_photo_url ? comment.user_photo_url : person} alt="person" className="w-7 h-7 rounded-full" />


          
            <div className="ml-5">
              <h3 className=" font-bold ">{comment.first_name} {comment.last_name}</h3>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-zinc-400 mt-3 lg:mt-0">
             {Moment(comment.created_at).format('DD/MM/YYYY')}
            </h4>
          </div>
        </div>

        <div>
          <p className="font-normal text-zinc-400 my-3 text-justify">
           {comment.comment}
          </p>
        </div>

      {(comment.user_id == user.user.id || comment.post_owner == user.user.id) &&  <div className='w-full flex justify-end items-center'>
          <p onClick={openModal} className='text-red-500 cursor-pointer text-sm'>Delete comment</p>
        </div>}


       
        </div>

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>Are you sure?</div>
        <form className='flex justify-between mt-5'>
          <button onClick={(e) => commentDelete(comment.id, e)} className="text-green-600">Yes</button>
          <button onClick={closeModal} className="text-red-500">No</button>
         
        </form>
      </Modal>
      
    </>
  )
}

export default Comment
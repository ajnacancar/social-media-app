import React, { useState } from "react";
import person from "../assets/profile-3.jpg";
import { AiFillLike } from "react-icons/ai";
import Comment from "./Comment";
import { BiEdit, BiTrash } from "react-icons/bi";
import Moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { likepost, deletePost } from "../features/post/postSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import AddComment from "./AddComment";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

function Post({ post }) {
  const { user: userR } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalCommentsIsOpen, setModalCommentsIsOpen] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModalComments() {
    setModalCommentsIsOpen(true);
  }

  function closeModalComments() {
    setModalCommentsIsOpen(false);
  }

  const postLike = (id) => {
    dispatch(likepost(id));
  };
  const postDelete = (id) => {
    dispatch(deletePost(id));
    if(location.pathname.includes("post")){
      navigate("/profile")
    }
  };

  return (
    <>
      <div className={`lg:w-[900px] shadow-lg p-4 mt-10`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex items-center">
            <img
              src={
                post.user && post.user.user_photo_url
                  ? post.user.user_photo_url
                  : person
              }
              alt="person"
              className="w-14 h-14 rounded-full"
            />

            <div className="ml-5">
              <h3 className="text-xl font-bold ">
                {post.user.first_name} {post.user.last_name}
              </h3>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-zinc-400 mt-3 lg:mt-0">
              {Moment(post.post.created_at).format("DD/MM/YYYY")}
            </h4>
          </div>
        </div>

        <div>
          <p className="font-normal text-zinc-400 my-3 text-justify">
            {post.post.text}
          </p>
        </div>

        {post.post.photo_url && (
          <div>
            <img  src={post.post.photo_url} alt="" />
          </div>
        )}

        <div className="w-full flex items-center justify-between mt-5 border-y-2 border-zinc-300/50 py-2">
          <div className="flex items-center">
            <div
              onClick={() => postLike(post.post.id)}
              className={post.already_liked ? `w-7 h-7 rounded-full bg-[#53C0FF] flex justify-center items-center text-white cursor-pointer` : "w-7 h-7 rounded-full bg-white flex justify-center items-center text-white cursor-pointer"}
            >
              <AiFillLike color={!post.already_liked ? '#53C0FF' : ''} className="w-4 h-4" />
            </div>
            <p className="ml-3 font-bold text-zinc-400">{post.likes}</p>
          </div>

          {post.post.user_id == userR.user.id && (
            <div className="flex justify-between items-center">
              <Link to="/post" state={post.post}>
                <BiEdit className="w-6 h-6 mr-5 text-green-700 cursor-pointer" />
              </Link>
              <BiTrash
                onClick={openModal}
                className="w-6 h-6 text-red-700 cursor-pointer"
              />
            </div>
          )}

          <div onClick={openModalComments}>
            <p className="font-normal text-lg text-zinc-400 cursor-pointer">
              Comments: {post.comments ? post.comments.length : 0}
            </p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>Are you sure?</div>
        <form className="flex justify-between mt-5">
          <button
            onClick={() => postDelete(post.post.id)}
            className="text-green-600"
          >
            Yes
          </button>
          <button onClick={closeModal} className="text-red-500">
            No
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={modalCommentsIsOpen}
        onRequestClose={closeModalComments}
        style={customStyles}
      >
        <div>
          <div className="flex justify-end">
            <IoClose
              onClick={closeModalComments}
              className="text-2xl cursor-pointer"
            />
          </div>

          <div className="overflow-y-scroll h-[400px] px-1">
            {post.comments &&
              post.comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
              ))}
          </div>
          <div className="mt-5 cursor-pointer flex justify-between items-center flex-col lg:flex-row">
            <div>
              <AddComment id={post.post.id} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Post;

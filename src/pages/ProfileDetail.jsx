import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import person from "../assets/person-244.svg";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import { getUserPosts } from "../features/post/postSlice";
import { ReactSpinner } from "react-spinning-wheel";
import "react-spinning-wheel/dist/style.css";
import {
  deleteFriend,
  getRequestStatus,
  sendRequest,
} from "../features/friends-request/requestSlice";
import LockProfile from "../components/LockProfile";

import { blockUser, getSingleUser } from "../features/user/userSlice";

function ProfileDetail() {
  const [isBlock, setIsBlock] = useState(false);
  const { posts, post, message, comment, isLoading } = useSelector(
    (state) => state.post
  );

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const {
    status,
    isSuccess,
    message: requestMessage,
  } = useSelector((state) => state.request);

  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleUser(id));
    dispatch(getUserPosts(id));
  }, [post, message, comment, requestMessage]);

  const sendFreindRequest = (id) => {
    dispatch(sendRequest(id));
  };

  const friendDelete = (id) => {
    dispatch(deleteFriend(id));
  };

  const userBlock = (id) => {
    dispatch(blockUser(id));
    setIsBlock(true);
  };

  useEffect(() => {
    return () => {
      dispatch(getRequestStatus(id));
    };
  }, [requestMessage]);
  return (
    <>
      {isBlock ? (
        <p>User is blocked.</p>
      ) : (
        <>
          {" "}
          {user && user.user && (
            <div className="w-full mt-10 lg:px-10 px-4 py-5">
              <div className="w-full flex items-center justify-between flex-col lg:flex-row">
                <div className="w-full flex lg:justify-center items-center">
                  <img
                    className="lg:w-96 lg:h-96 rounded-lg"
                    src={
                      user && user.user.user_photo_url
                        ? user.user.user_photo_url
                        : person
                    }
                    alt=""
                  />
                </div>

                <div className="w-full mt-5">
                  <h1 className="font-bold tracking-wider lg:text-3xl text-2xl">
                    {user.user.first_name} {user.user.last_name} -{" "}
                    {user.user.username}
                  </h1>
                  <p className="text-zinc-400 mt-5 lg:text-xl">
                    {user.user.profile_description}
                  </p>
                  <div className="my-5 flex space-x-8 items-center">
                    <div>
                      <h1 className="font-bold text-xl">
                        {user.number_of_posts}
                      </h1>
                      <p className="font-light text-sm text-gray-700">Posts</p>
                    </div>

                    <div
                      className="cursor-pointer"
                      onClick={() => navigate(`/friends/${user.user.id}`)}
                    >
                      <h1 className="font-bold text-xl">
                        {user.number_of_friends}
                      </h1>
                      <p className="font-light text-sm text-gray-700">
                        Friends
                      </p>
                    </div>
                  </div>
                  {status.status === "not_friends" && (
                    <button
                      onClick={() => sendFreindRequest(user.user.id)}
                      className="p-2 border-2 bg-[#53C0FF] rounded-lg font-bold text-white mt-5 border-[#53C0FF] hover:bg-transparent hover:text-[#53C0FF]"
                    >
                      Add Friend
                    </button>
                  )}

                  {status.status === "accepted" && (
                    <button
                      onClick={() => friendDelete(user.user.id)}
                      className="p-2 border-2 bg-red-500 rounded-lg font-bold text-white mt-5 border-red-500 hover:bg-transparent hover:text-red-500"
                    >
                      Delete Friend
                    </button>
                  )}

                  {status.status === "pending" && (
                    <button
                      disabled
                      className="p-2 border-2 bg-zinc-300 rounded-lg font-bold text-white mt-5 border-zinc-300 hover:bg-transparent hover:text-zinc-300"
                    >
                      Pending
                    </button>
                  )}

                  <button
                    onClick={() => userBlock(user.user.id)}
                    className="p-2 ml-2 border-2 bg-yellow-500 rounded-lg font-bold text-white mt-5 border-yellow-500 hover:bg-transparent hover:text-yellow-500"
                  >
                    Block user
                  </button>
                </div>
              </div>

              {status.status === "accepted" ||
              user.user.profile_type === "public" ? (
                <div className="flex justify-center">
                  <div>
                    <div className="text-center">
                      <h1 className="text-zinc-400 font-medium lg:text-3xl text-2xl lg:mt-16 mt-10 tracking-wider uppercase">
                        Posts
                      </h1>
                    </div>

                    <div>
                      {posts &&
                        posts.length > 0 &&
                        posts.map((post, index) => (
                          <Post key={index} post={post} />
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <LockProfile />
                </>
              )}
            </div>
          )}{" "}
        </>
      )}
    </>
  );
}

export default ProfileDetail;

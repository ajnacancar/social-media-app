import React from "react";
import person from "../assets/person-244.svg";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {  getBlockedUsers } from "../features/user/userSlice";
import { getUserPosts } from "../features/post/postSlice";
import { getSingleUser } from "../features/user/userSlice";
import { useEffect } from "react";
import { ReactSpinner } from "react-spinning-wheel";
import "react-spinning-wheel/dist/style.css";

function Profile() {
  const { user: userA } = useSelector((state) => state.auth);

  const {
    user,
    users

  } = useSelector((state) => state.user);

  const { posts, post, message, comment, isLoading } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getSingleUser(userA.user.id));
    dispatch(getUserPosts(userA.user.id));
    dispatch(getBlockedUsers(userA.user.id))
  }, [post, message, comment, userA]);
  return (
    <>
      {user && user.user &&   <div className="w-full mt-10 lg:px-10 px-4 py-5">
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
                  <h1 className="font-bold text-xl">{user.number_of_posts}</h1>
                  <p className="font-light text-sm text-gray-700">Posts</p>
                </div>

                <div
                  onClick={() => navigate(`/friends/${user.user.id}`)}
                  className="cursor-pointer"
                >
                  <h1 className="font-bold text-xl">
                    {user.number_of_friends}
                  </h1>
                  <p className="font-light text-sm text-gray-700">Friends</p>
                </div>

                <div
                  onClick={() => navigate(`/blocked-users`)}
                  className="cursor-pointer"
                >
                  <h1 className="font-bold text-xl">
                 {users.constructor === Array ? users.length : 0}
                  </h1>
                  <p className="font-light text-sm text-gray-700">Blocked users</p>
                </div>
              </div>
              <div className="flex  justify-start  items-end mt-10 ">
                <div className="space-x-2">
                  <Link to={`/user/${user.user.id}`}>
                  <button className="bg-[#53C0FF] text-white cursor-pointer p-2 rounded font-bold">
                      Edit your account
                    </button>
                  </Link>
                

                  <Link to={`/post`}>
                    <button className="bg-green-700 text-white cursor-pointer p-2 rounded font-bold">
                      Add new post
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

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
                  posts.map((post, index) => <Post key={index} post={post} />)}
              </div>
            </div>
          </div>
        </div>} </>
  );
}

export default Profile;

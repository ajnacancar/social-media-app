import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlockedUsers, unblockUser } from "../features/user/userSlice";
import person from "../assets/person-244.svg";
import { ReactSpinner } from "react-spinning-wheel";
import "react-spinning-wheel/dist/style.css";

function BlockedUsers() {
  const dispatch = useDispatch();
  const { users, isLoading, message } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getBlockedUsers());
  }, [message]);

  const userUnblock = (id) =>{
    dispatch(unblockUser(id))
  }

  return (
    <>
      {isLoading ? (
        <ReactSpinner />
      ) : (
        <div className="mx-auto w-full">
          <div className="w-full flex justify-center">
            <div className="lg:w-[900px] p-5 grid lg:grid-cols-3 gap-4">
              {users.constructor == Array &&
                users.map((user, index) => (
                  <div key={index} className="p-3 rounded shadow-2xl">
                    <div className="flex space-x-4">
                      <img
                        src={user.user_blocked_profile_image || person}
                        alt=""
                        className="w-14 h-14"
                      />
                      <div>
                        <p className="text-xl font-bold">
                          {user.user_blocked_firstname}{" "}
                          {user.user_blocked_lastname}
                        </p>
                        <button onClick={() => userUnblock(user.user_blocked_id)} className="p-1 border-2 bg-[#53C0FF] rounded-lg text-sm font-medium text-white border-[#53C0FF] hover:bg-transparent hover:text-[#53C0FF]">
                        Unblock
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              {users.message && <p>{users.message}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BlockedUsers;

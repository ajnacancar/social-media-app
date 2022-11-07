import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserFriends } from "../features/friends/friendSlice";
import person from "../assets/person-244.svg";

import { ReactSpinner } from "react-spinning-wheel";
import "react-spinning-wheel/dist/style.css";

function Friends() {
  const { friends, isLoading } = useSelector((state) => state.friend);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { message } = useSelector((state) => state.request);

  useEffect(() => {
    dispatch(getUserFriends(id));
  }, [id, message]);

  return (
    <>
      {isLoading ? (
        <ReactSpinner />
      ) : (
        <div className="mx-auto w-full">
          <div className="w-full flex justify-center">
            <div className="lg:w-[900px] p-5 grid lg:grid-cols-3 gap-4">
              {friends.constructor == Array &&
                friends.map((friend, index) => (
                  <div key={index} className="p-3 rounded shadow-2xl">
                    <div className="flex space-x-4">
                      <img
                        src={friend.friend_profile_image || person}
                        alt=""
                        className="w-14 h-14"
                      />
                      <div>
                        <Link
                          to={
                            user.user.id === friend.friend_id
                              ? "/profile"
                              : `/profile/${friend.friend_id}`
                          }
                        >
                          {" "}
                          <p className="text-xl font-bold">
                            {friend.friend_lastname} {friend.friend_firstname}
                          </p>
                        </Link>

                      </div>
                    </div>
                  </div>
                ))}

              {friends.message && <p>{friends.message}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Friends;

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import person from "../assets/person-244.svg";
import { ReactSpinner } from "react-spinning-wheel";
import "react-spinning-wheel/dist/style.css";

function CardProfile({ user }) {
  const { user: userR } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  return (
    <>
      <div className="p-4 lg:w-80 shadow-lg">
        <div className="w-full">
          <img
            className="rounded w-full lg:h-72"
            src={user.user.user_photo_url || person}
            alt=""
          />
        </div>
        <Link
          to={userR.user.id === user.user.id ? "/profile" : `/profile/${user.user.id}`}
          state={user}
        >
          <h1 className="mt-3 text-zinc-500 text-2xl font-bold">
            {user.user.first_name} {user.user.last_name}
          </h1>
        </Link>
 
      </div>
    </>
  );
}

export default CardProfile;

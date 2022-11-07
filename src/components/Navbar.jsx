import React, { useState, useEffect } from "react";
import {
  RiNotification4Fill,
  RiUser3Fill,
  RiSearchLine,
  RiLogoutBoxRLine,
  RiMenuLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import {BsFillChatFill} from 'react-icons/bs'

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const [openMenu, setOpenMenu] = useState(false);
  const [numberOfNotification, setNumberOfNotification] = useState(0)
  const dispatch = useDispatch();
  let wss = user ? new WebSocket(`ws://192.168.50.34:8080/websocket/notifications/${user.user.id}`) : null
  const [ws, setWs] = useState(
    wss
  );

  useEffect(() => {

    if (ws) {
      ws.onopen = () => {
        console.log("WebSocket Connected");
      };

      ws.onmessage = (e) => {
        console.log(e.data, "notifications")
       setNumberOfNotification(e.data)
      };

      return () => {
        ws.onclose = () => {
          console.log("WebSocket Disconnected");
        };
      };
    }
  }, [ws]);

  return (
    <>
      <div className="h-[100px] w-full">
        <div className="sm:px-24 px-5 flex justify-between items-center w-full h-full bg-[#53C0FF] text-white">
          <div className="flex items-center sm:w-full sm:h-full w-24">
            <Link to={"/"}>
              <h1 className="font-['Kanit'] font-bold text-2xl italic">
                SocApp
              </h1>
            </Link>
          </div>
          <ul className="hidden lg:flex lg:w-full lg:justify-end">
            {user && user.user ? (
              <>
                <li className="lg:p-8 text-xl tracking-wider capitalize ">
                  <Link to={"/search"}> search</Link>
                </li>
                <li className="lg:p-8 text-xl tracking-wider  capitalize flex justify-center relative">
                  <Link to={"/notification"}>
                    Notification
                    <div className="w-5 h-5 rounded-full bg-red-600 text-white flex justify-center items-center text-sm font-bold absolute right-4 top-1/3">
                      {numberOfNotification}
                    </div>
                  </Link>
                </li>
                <li className="lg:p-8 text-xl tracking-wider capitalize">
                  <Link to={"/profile"}>Profile</Link>
                </li>

                <li className="lg:p-8 text-xl tracking-wider capitalize">
                  <Link to={"/chat"}>Chat</Link>
                </li>

                <li
                  onClick={() => dispatch(logout())}
                  className="lg:p-8 text-xl tracking-wider capitalize cursor-pointer"
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <li className="lg:p-8 text-xl tracking-wider capitalize">
                  <Link to={"/login"}>Login</Link>
                </li>
                <li className="lg:p-8 text-xl tracking-wider capitalize">
                  <Link to={"/register"}>Register</Link>
                </li>
              </>
            )}
          </ul>

          <div onClick={() => setOpenMenu(!openMenu)} className="lg:hidden">
            <RiMenuLine className="w-7 h-7" />
          </div>
        </div>

        {openMenu && (
          <div className="bg-[#53C0FF] text-white absolute w-full text-center">
            <div className="lg:hidden mr-4 ">
              <ul className="flex flex-col">
                {user && user.user ? (
                  <>
                    {" "}
                    <li className="p-4 flex justify-center">
                      <Link to={"/search"}>
                        {" "}
                        <RiSearchLine className="w-7 h-7" />{" "}
                      </Link>
                    </li>
                    <li className="p-4 flex justify-center relative">
                      <Link to={"/notification"}>
                        <RiNotification4Fill className="w-7 h-7" />

                        <div className="w-5 h-5 rounded-full bg-red-600 text-white flex justify-center items-center text-sm font-bold absolute left-1/2 top-3">
                          {numberOfNotification}
                        </div>
                      </Link>
                    </li>
                    <li className="p-4 flex justify-center">
                      <Link to={"/profile"}>
                        <RiUser3Fill className="w-7 h-7" />{" "}
                      </Link>
                    </li>

                    <li className="p-4 flex justify-center">
                      <Link to={"/chat"}>
                        <BsFillChatFill className="w-7 h-7" />
                      </Link>
                    </li>
                    <li
                      onClick={() => dispatch(logout())}
                      className="p-4 flex justify-center"
                    >
                      <RiLogoutBoxRLine className="w-7 h-7" />
                    </li>
                  </>
                ) : (
                  <>
                    <li className="lg:p-8 mr-2 text-xl tracking-wider capitalize">
                      <Link to={"/login"}>Login</Link>
                    </li>
                    <li className="lg:p-8 text-xl tracking-wider capitalize">
                      <Link to={"/register"}>Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;

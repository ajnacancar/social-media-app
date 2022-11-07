import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotifications } from "../features/notifications/notificationSlice";
function AnotherNotifications() {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

    const onClickNotification = (item) => {
        let array = item.url.split("/")
        if(array[1] === "post"){
            navigate(`/post/${array[2]}`)
        }else if (array[1] === "user"){
          navigate(`/profile/${array[2]}`)
        }else if(array[1] === "chat"){
              navigate("/chat", {state: item})
        }
    }
  return (
    <>
      <div className="h-[600px] overflow-y-scroll space-y-4 mx-5">
        {notifications.constructor == Array &&
          notifications.map((notification) => (
         <div
              key={notification.id}
              className={notification.state === 'unread' ? "p-5 bg-gray-400/30 flex justify-between items-center cursor-pointer" : "p-5 bg-[#53C0FF]/30 flex justify-between items-center cursor-pointer"}
              onClick={() => onClickNotification(notification)}
            >
              <p>
                <b>
                  {notification.sender_first_name}{" "}
                  {notification.sender_last_name}{" "}
                </b>
                {notification.message}
              </p>
              <p className="font-medium text-zinc-400">
                {moment(notification.created_at).format("DD/MM/YYYY")}
              </p>
            </div>
         
          ))}
         
      </div>
    </>
  );
}

export default AnotherNotifications;

import React, { useRef, useState } from "react";
// import FreindsAndChat from '../components/FreindsAndChat'
// import Messages from '../components/Messages'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFriends } from "../features/friends/friendSlice";
import axios from "axios";
import Picker from "emoji-picker-react";
import moment from "moment";
import { getUserMessages } from "../features/messages/messagesSlice";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
function Chat() {
  const { friends } = useSelector((state) => state.friend);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [ws, setWs] = useState(
    new WebSocket(`ws://192.168.50.34:8080/websocket/${user.user.id}`)
  );
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);
  const [senderData, setSenderData] = useState(null);
  const [url, setUrl] = useState();
  const [roomId, setRoomId] = useState();
  const [showEmoji, setShowEmoji] = useState(false);
    const location = useLocation()

    const submitMessage = (msg) => {
    ws.send(
      JSON.stringify({ action: "send-message", target: roomId, message: msg })
    );
    const NewMessage = {
      message: msg,
      sender_id: user.user.id,
    };
    setMessages([...messages, NewMessage]);
    setMessage("");
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getMesages = async (id, friend) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await axios.get(`/chatroom/${id}`, config);
    setMessages(response.data.messages);
    setUrl(`ws://192.168.50.34:8080/websocket/${user.user.id}`);
    setSenderData(`${friend.friend_firstname} ${friend.friend_lastname}`);
    setRoomId(response.data.room_id);
    ws.send(
      JSON.stringify({ action: "join-room", target: response.data.room_id })
    );
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + event.emoji);
  };

  useEffect(() => {
    scrollToBottom();

    ws.onerror = (e) => {
      console.log("error", e);
    };

    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = (e) => {
      console.log(e);

      const newMessage = JSON.parse(e.data);

      if (
        newMessage.target === roomId &&
        newMessage.sender.id !== user.user.id
      ) {
        setMessages([...messages, newMessage]);
      }
    };

    return () => {
      ws.onclose = () => {
        console.log("WebSocket Disconnected");
        setWs(new WebSocket(url));
      };
    };
  }, [ws.onmessage, messages, ws.onopen, ws.onclose]);

  useEffect(() => {
    dispatch(getUserFriends(user.user.id));
    if(location.state && ws){
      getMesages(location.state.sender_id, {friend_firstname: location.state.sender_first_name, friend_lastname: location.state.sender_last_name})
    }
  }, []);

  return (
    <div className="lg:mt-5 lg:w-2/3 mx-auto">
      <div className="w-full">
        <div className="flex items-center w-full p-5 border-b border-gray-200">
          <h2 className="font-medium text-base mr-auto">People</h2>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 xl:col-span-3">
              <div className="border border-gray-200 rounded-md lg:h-72 overflow-y-scroll space-y-3">
                {friends.constructor === Array &&
                  friends.map((friend, index) => (

                    <div
                      key={index}
                      className="w-full p-3 bg-zinc-100 flex space-x-5 items-center cursor-pointer"
                      onClick={() => getMesages(friend.friend_id, friend)}
                    >                  
                      <div>
                        <img
                          src={friend.friend_profile_image}
                          alt=""
                          className="w-12 h-12 rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-bold">
                          {friend.friend_firstname} {friend.friend_lastname}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="col-span-12 xl:col-span-5">
              <div className="overflow-y-scroll h-[600px]  border-2 border-gray-200 px-2 scroll-mb-0">
                {messages &&
                  messages.map((message, index) => {
                    return (
                      <div      key={index}>
                      {index === 0 &&   <p className="alert alert-info text-center message-date-indicatore">
                         {   moment(message.created_at).format(
                            "DD/MM/YYYY"
                          )}
                          </p>}
                        {(index === 0
                          ? moment(messages[0].created_at).format("DD/MM/YYYY")
                          : moment(messages[index - 1].created_at).format(
                              "DD/MM/YYYY"
                            )) !==
                          moment(messages[index].created_at).format(
                            "DD/MM/YYYY"
                          ) && (
                          <p className="alert alert-info text-center message-date-indicatore">
                         {   moment(message.created_at).format(
                            "DD/MM/YYYY"
                          )}
                          </p>
                        )}
                        <div
                     
                          className={
                            user.user.id === message.sender_id
                              ? "flex justify-end w-full my-2 "
                              : "flex justify-start w-full my-2"
                          }
                        >
                          <div
                            className={
                              user.user.id === message.sender_id
                                ? " w-[70%] bg-[#53C0FF]  p-4 rounded-xl"
                                : " w-[70%] bg-gray-200  p-4 rounded-xl"
                            }
                          >
                            <div className="flex items-center justify-between">
                              <p className="font-bold">
                                {message.sender_id === user.user.id
                                  ? "You"
                                  : senderData}
                              </p>
                              <p className="text-sm">
                                {moment(message.created_at).format(
                                  "h:mm"
                                )}
                              </p>
                            </div>
                            <p>{message.message}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                <div ref={messageEndRef} />
              </div>

              <form
                className="mt-5 space-x-4 items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitMessage(message);
                }}
              >
                <div className="flex items-center space-x-5 mb-2">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter your message..."
                    className="p-2 text-lg outline-none border-b w-[75%]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <BsEmojiSmileFill
                    onClick={() => setShowEmoji(!showEmoji)}
                    size={30}
                    className="cursor-pointer"
                    color="#53C0FF"
                  />
                  <button className="p-2 text-[#53C0FF]">Send</button>
                </div>
              </form>
            </div>

            <div className="col-span-12 xl:col-span-3">
              {showEmoji && <Picker onEmojiClick={onEmojiClick} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

import { configureStore } from '@reduxjs/toolkit';
import authReducer  from '../features/auth/authSlice'
import postReducer from '../features/post/postSlice'
import requestReducer from '../features/friends-request/requestSlice'
import friendReducer from '../features/friends/friendSlice'
import userReducer from '../features/user/userSlice'
import notificationReducer from '../features/notifications/notificationSlice'
import messagesReducer from '../features/messages/messagesSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    request: requestReducer,
    friend: friendReducer,
    user: userReducer,
    notification: notificationReducer,
    messages: messagesReducer
  },
});

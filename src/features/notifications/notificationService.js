import axios from "axios";

//GET  USER NOTIFICATION

const getUserNotifications = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.get(`/notifications`, config);
    return response.data;
  }


  const notificationService = {
    getUserNotifications
  };
  
  export default notificationService;
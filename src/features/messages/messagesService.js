import axios from 'axios'

//GET USER MESSAGES

const getUserMessages = async (token, id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.get(`/chatroom/${id}`, config);
    console.log(response.data, "slice")
    return response.data;
  }


  const messagesService = {

    getUserMessages
  };
  
  export default messagesService;
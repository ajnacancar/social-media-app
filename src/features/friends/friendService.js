import axios from "axios";

//GET  USER Friends

const getUserFriends = async (token, id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.get(`/user/${id}/friends`, config);
    return response.data;
  }


  const friendService = {

    getUserFriends
  };
  
  export default friendService;
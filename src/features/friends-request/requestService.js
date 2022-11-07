import axios from 'axios';


//Send request for friends
const sendRequest = async (token, id) =>{

    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    const response = await axios.post(`/user/${id}/add`, {}, config)
    return response.data
}


//Get requests
const getRequests = async (token) =>{

  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  const response = await axios.get(`/friendshipRequests`,  config)
  return response.data
}


//Get requests
const getRequestStatus = async (token, id) =>{

  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  const response = await axios.get(`/friendshipStatus/${id}`,  config)
  return response.data
}

//Accept requests
const acceptRequest = async (token, id) =>{

  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  const response = await axios.put(`/friendshipRequest/${id}/accept`, {},  config)
  return response.data
}


//Decline requests
const declineRequest = async (token, id) =>{

  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  const response = await axios.delete(`/friendshipRequest/${id}/decline`,  config)
  return response.data
}

//delete requests
const deleteFriend = async (token, id) =>{

  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  const response = await axios.delete(`/user/${id}/remove`,  config)
  return response.data
}


const requestService = {
   sendRequest,
   getRequests,
   getRequestStatus,
   acceptRequest,
   declineRequest,
   deleteFriend
   };
   
   export default requestService;
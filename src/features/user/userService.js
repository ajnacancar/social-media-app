import axios from "axios";



//GET SINGLE USER

const getSingleUser = async (token, id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.get(`/user/${id}`, config);
    return response.data;
  }



//BLOCK USER
const blockUser = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`/user/${id}/block`, {}, config);
  return response.data;
};

//GET BLOCKED USERS
const getBlockedUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/user/blocked-users", config);
  return response.data;
};

//UNBLOCK USER
const unblockUser = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`/user/${id}/unblock`, config);
  return response.data;
};

//UPDATE USER
const updateUser = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put("/user", data, config);

  if (response.data) {
    localStorage.removeItem("user")
    localStorage.setItem(
      "user",
      JSON.stringify({ data: { token: token, user: response.data } })
    );
  }

  return response.data;
};

  const userService = {
    getSingleUser,
    blockUser,
    getBlockedUsers,
    unblockUser,
    updateUser
  }

  export default userService
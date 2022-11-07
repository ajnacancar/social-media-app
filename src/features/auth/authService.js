import axios from "axios";

//REGISTER USER
const register = async (userData) => {
  const response = await axios.post("/register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response));
  }

  return response.data;
};

//LOGIN USER
const login = async (userData) => {
  const response = await axios.post(`/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response));
  }


  return response.data;
};

//LOGOUT USER
const logout = () => localStorage.removeItem("user");

//SEARCH USERS
const search = async (token, value) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`/users/?search=${value}`, config);

  return response.data;
};


//DELETE USER
const deleteUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete("/user", config);
  localStorage.removeItem("user");
  return response.data;
};






const authService = {
  register,
  login,
  logout,
  search,
  deleteUser,
};

export default authService;

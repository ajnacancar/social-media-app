import axios from "axios";

//Get posts by user
const getUserPosts = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`/user/${id}/posts`, config);
  return response.data;
};

//Create post
const createPost = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`/post`, data, config);

  return response.data;
};

//Like post
const likePost = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`/post/${id}/like`, {}, config);
  return response.data;
};

//Update post
const updatePost = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`/post/${data.id}`, data, config);

  return response.data;
};

//Delete post
const deletePost = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`/post/${id}`, config);

  return response.data;
};

//Comment post
const commentPost = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `/post/${data.id}/comment`,
    data.values,
    config
  );

  return response.data;
};

//Delete comment
const deleteComment = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`/comment/${id}`, config);

  return response.data;
};

//Get home page post
const homePagePosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`/posts`, config);

  return response.data;
};

//Get single post
const getSinglePost = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`/post/${id}`, config);
  return response.data;
};

const postService = {
  getUserPosts,
  createPost,
  likePost,
  updatePost,
  deletePost,
  commentPost,
  deleteComment,
  homePagePosts,
  getSinglePost,
};

export default postService;

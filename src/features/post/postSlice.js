import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  post: {},
  posts: [],
  isError: false,
  isSuccess: false,
  message: "",
  comment: {}
};

//Get user posts
export const getUserPosts = createAsyncThunk(
  "getuserposts",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.getUserPosts(token, id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


//Like post
export const likepost = createAsyncThunk(
  "likepost",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.likePost(token, id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Update post
export const updatePost = createAsyncThunk(
  "upatepost",
  async  (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.updatePost(token, data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Create Post
export const createPost = createAsyncThunk(
  "createPost",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.createPost(token, data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete post
export const deletePost = createAsyncThunk(
  "deletepost",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.deletePost(token, id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Comment post
export const commentPost = createAsyncThunk(
  "commentpost",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.commentPost(token, data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


//Delete comment
export const deleteComemnt = createAsyncThunk(
  "deletecomment",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.deleteComment(token, id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get Home Page Posts
export const getHomePagePosts = createAsyncThunk(
  "getHomePagePosts",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.homePagePosts(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


//Get SinglePost
export const getSinglePost = createAsyncThunk(
  "gteSInglePost",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.getSinglePost(token, id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getUserPosts.fulfilled, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.posts = acion.payload;
      })
      .addCase(getUserPosts.rejected, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = acion.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createPost.fulfilled, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.post = acion.payload;
      })
      .addCase(createPost.rejected, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = acion.payload;
      })
      .addCase(likepost.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(likepost.fulfilled, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = acion.payload;
      })
      .addCase(likepost.rejected, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = acion.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updatePost.fulfilled, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.post = acion.payload;
      })
      .addCase(updatePost.rejected, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = acion.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deletePost.fulfilled, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = acion.payload
      })
      .addCase(deletePost.rejected, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = acion.payload;
      })
      .addCase(commentPost.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(commentPost.fulfilled, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.comment = acion.payload
      })
      .addCase(commentPost.rejected, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = acion.payload;
      })
      .addCase(deleteComemnt.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteComemnt.fulfilled, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.comment = acion.payload
      })
      .addCase(deleteComemnt.rejected, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = acion.payload;
      })

      .addCase(getHomePagePosts.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getHomePagePosts.fulfilled, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.posts = acion.payload
      })
      .addCase(getHomePagePosts.rejected, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = acion.payload;
      })

      .addCase(getSinglePost.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getSinglePost.fulfilled, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.post = acion.payload
      })
      .addCase(getSinglePost.rejected, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = acion.payload;
      })
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;

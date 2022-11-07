import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import friendService from "./friendService";

const initialState = {
  isError: false,
  isSuccess: false,
  message: "",
  isLoading: false,
  friends: [],
};

//get User
export const getUserFriends = createAsyncThunk(
  "getuserfriends",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await friendService.getUserFriends(token, id);
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


export const friendSlice = createSlice({
    name: "friend",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserFriends.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getUserFriends.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.friends = action.payload;
          })
          .addCase(getUserFriends.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.friends = []
          })
    }
})


export const { reset } = friendSlice.actions;
export default friendSlice.reducer;
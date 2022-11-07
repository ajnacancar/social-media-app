import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messagesService from "./messagesService";

const initialState = {
    isError: false,
    isSuccess: false,
    message: "",
    isLoading: false,
    messages: [],
  };


  //get User Mesasges
export const getUserMessages = createAsyncThunk(
    "getusermessages",
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await messagesService.getUserMessages(token, id);
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



export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserMessages.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getUserMessages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.messages = action.payload;
          })
          .addCase(getUserMessages.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.messages = []
          })
    }
})


export const { reset } = messagesSlice.actions;
export default messagesSlice.reducer;
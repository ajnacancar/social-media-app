import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from "./notificationService";

const initialState = {
  isError: false,
  isSuccess: false,
  message: "",
  isLoading: false,
  notifications: [],
  numberOfNotifications: 0,
};



//get notificatios
export const getNotifications = createAsyncThunk(
    "getNotifications",
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await notificationService.getUserNotifications(token);
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


  export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
    .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.notifications = []
      })

    

    }


})


export const { reset } = notificationSlice.actions;
export default notificationSlice.reducer;
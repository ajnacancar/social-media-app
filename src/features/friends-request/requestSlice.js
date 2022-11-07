import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "./requestService";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  requests: [],
  status: ""
};

//Send request
export const sendRequest = createAsyncThunk(
  "sendrequest",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await requestService.sendRequest(token, id);
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


//Get requests
export const getRequests = createAsyncThunk(
  "getrequests",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await requestService.getRequests(token);
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

//Get requests
export const getRequestStatus = createAsyncThunk(
  "getrequeststatus",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await requestService.getRequestStatus(token, id);
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

//Accept request
export const acceptrequest = createAsyncThunk(
  "acceptrequest",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await requestService.acceptRequest(token, id);
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

//Decline request
export const declineRequest = createAsyncThunk(
  "declineRequest",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await requestService.declineRequest(token, id);
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


//Delete friend
export const deleteFriend = createAsyncThunk(
  "deletefriend",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await requestService.deleteFriend(token, id);
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




export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendRequest.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(sendRequest.fulfilled, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = acion.payload;
      })
      .addCase(sendRequest.rejected, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = acion.payload;
      })
      .addCase(getRequests.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getRequests.fulfilled, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.requests = acion.payload;
      })
      .addCase(getRequests.rejected, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = acion.payload;
      })
      .addCase(acceptrequest.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(acceptrequest.fulfilled, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = acion.payload;
      })
      .addCase(acceptrequest.rejected, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = acion.payload;
      })

      .addCase(getRequestStatus.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getRequestStatus.fulfilled, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.status = acion.payload;
      })
      .addCase(getRequestStatus.rejected, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = acion.payload;
      })
      .addCase(declineRequest.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(declineRequest.fulfilled, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = acion.payload;
      })
      .addCase(declineRequest.rejected, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = acion.payload;
      })

      .addCase(deleteFriend.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteFriend.fulfilled, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = acion.payload;
      })
      .addCase(deleteFriend.rejected, (state, acion) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = acion.payload;
      })
  },
});

export const { reset } = requestSlice.actions;
export default requestSlice.reducer;

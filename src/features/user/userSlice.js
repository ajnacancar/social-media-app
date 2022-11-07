import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    message: "",
    isLoading: false,
    users: []
  };

//getSingleUser
export const getSingleUser = createAsyncThunk(
  "getsingleuser",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getSingleUser(token, id);
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





  //block user
  export const blockUser = createAsyncThunk(
    'blockuser',  async (id, thunkAPI) => {
       try {
        const token = thunkAPI.getState().auth.user.token;
           return await userService.blockUser(token, id)
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
   )


  //get blocked users
  export const getBlockedUsers = createAsyncThunk(
    'getblockedusers',  async (_, thunkAPI) => {
       try {
        const token = thunkAPI.getState().auth.user.token;
           return await userService.getBlockedUsers(token)
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
   )

     //unblock user
  export const unblockUser = createAsyncThunk(
    'unblockuser',  async (id, thunkAPI) => {
       try {
        const token = thunkAPI.getState().auth.user.token;
           return await userService.unblockUser(token, id)
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
   )


 //UPDATE
 export const updateUser = createAsyncThunk(
  'update',  async (value, thunkAPI) => {
     try {
      const token = thunkAPI.getState().auth.user.token;
         return await userService.updateUser(token, value)
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
 )


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      })
   
      .addCase(blockUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload
        state.user = null;
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBlockedUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlockedUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload
      })
      .addCase(getBlockedUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(unblockUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload
      })
      .addCase(unblockUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.users = [];
        state.isError = true;
        state.message = action.payload;
      })
    }
})


export const { reset } = userSlice.actions;
export default userSlice.reducer;
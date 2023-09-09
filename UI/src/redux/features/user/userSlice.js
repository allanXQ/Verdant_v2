import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  status: "idle",
  error: null,
  user: {
    id: null,
    username: null,
    googleName: null,
    firstName: null,
    lastName: null,
    image: null,
    email: null,
    phone: null,
    balance: 0,
    portfolio: [],
    trades: [],
    deposits: [],
    withdrawals: [],
    transfers: [],
    spotOrders: [],
    p2pOrders: [],
    loanRequests: [],
    loanRepayments: [],
    swapOrders: [],
    referrals: [],
  },
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (token, thunkAPI) => {
    try {
      const userData = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/v1/user/user-info",
        {},
        { withCredentials: true }
      );
      return userData.data.payload;
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const userLogout = createAsyncThunk(
  "user/logout",
  async (token, thunkAPI) => {
    try {
      const logout = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      return logout.data.payload;
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.user = action.payload[0];
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(userLogout.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = false;
        state.user = initialState.user;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export const { loginSuccess, loginFailed, updateUser } = userSlice.actions;
export default userSlice.reducer;

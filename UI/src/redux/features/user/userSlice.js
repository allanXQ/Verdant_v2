import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  user: {
    id: 0,
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
    error: null,
  },
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (token, thunkAPI) => {
    try {
      const userData = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/v1/user/user-info"
      );
      return userData.data.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export const { login } = userSlice.actions;
export default userSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  isRegistered: false,
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

export const userAPI = createAsyncThunk(
  "user/api",
  async ({ endpoint, method, data }, thunkAPI) => {
    try {
      const response = await axios({
        method,
        url: `${process.env.REACT_APP_SERVER_URL}/api/v1${endpoint}`,
        data,
        withCredentials: true,
      });
      return response.data.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailed(state, action) {
      state.isLoggedIn = false;
      state.error = action.payload.error;
    },
    updateUser(state, action) {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith("user/api/pending"),
        (state, action) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("user/api/fulfilled"),
        (state, action) => {
          state.status = "succeeded";
          switch (action.meta.arg.endpoint) {
            case "/auth/register":
              state.isRegistered = true;
              break;
            case "/auth/login":
              state.isLoggedIn = true;
              break;
            case "/auth/logout":
              state.isLoggedIn = false;
              state.user = initialState.user;
              break;
            case "/user/user-info":
              state.user = action.payload[0];
              break;
            default:
              break;
          }
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("user/api/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectIsRegistered = (state) => state.user.isRegistered;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export const { loginSuccess, loginFailed, updateUser } = userSlice.actions;
export default userSlice.reducer;

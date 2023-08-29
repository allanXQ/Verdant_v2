import { createSlice } from "@reduxjs/toolkit";

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
    token: null,
    refreshToken: null,
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;

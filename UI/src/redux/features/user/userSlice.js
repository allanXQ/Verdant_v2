import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {
    id: 0,
    username: "",
    googleName: "",
    firstName: "",
    lastName: "",
    image: "",
    email: "",
    phone: "",
    balance: 0,
    token: "",
    refreshToken: "",
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

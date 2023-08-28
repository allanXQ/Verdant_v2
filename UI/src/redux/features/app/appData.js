import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  klineIntervals: [],
  assets: [],
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "appData/fetchAppData",
  async () => {
    try {
      const appData = await fetch(process.env.REACT_APP_SERVER_URL + "/v1/");
    } catch (error) {}
  }
);

export const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    updateDefaultKlineOption: (state, action) => {
      const { value } = action.payload;
      state.klineIntervals.forEach((option) => {
        // add new default value, remove an old default value that isn't main/new default value
        if (option.value === value) {
          option.default = true;
        } else {
          option.default = false;
        }
      });
    },
  },
});

export const { updateDefaultKlineOption } = appDataSlice.actions;
export default appDataSlice.reducer;

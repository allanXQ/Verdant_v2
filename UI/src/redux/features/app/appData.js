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
      const appData = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/v1/app-data/general-data"
      );
      console.log(appData);
      return appData.data.payload;
    } catch (error) {
      return error.message;
    }
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAppData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.klineIntervals = action.payload.klineIntervals;
        state.assets = action.payload.assets;
      })
      .addCase(fetchAppData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectKlineIntervals = (state) => state.appData.klineIntervals;
export const selectAssets = (state) => state.appData.assets;
export const selectAppDataStatus = (state) => state.appData.status;
export const selectAppDataError = (state) => state.appData.error;

export const { updateDefaultKlineOption } = appDataSlice.actions;
export default appDataSlice.reducer;

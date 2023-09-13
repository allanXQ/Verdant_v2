import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  klineIntervals: [],
  assets: [],
  p2pTrades: [],
  spotTrades: [],
  status: "idle",
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "appData/fetchAppData",
  async ({ endpoint, method, data }, thunkAPI) => {
    try {
      const response = await axios({
        method,
        url: `${process.env.REACT_APP_SERVER_URL}/api/v1/app/${endpoint}`,
        data,
        withCredentials: true,
      });
      return response.data.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchAppData.pending, (state, action) => {
  //       state.status = "loading";
  //     })
  //     .addCase(fetchAppData.fulfilled, (state, action) => {
  //       state.status = "succeeded";
  //       state.klineIntervals = action.payload.klineIntervals;
  //       state.assets = action.payload.assets;
  //     })
  //     .addCase(fetchAppData.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.error.message;
  //     });
  // },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith("appData/api/pending"),
        (state, action) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("appData/api/fulfilled"),
        (state, action) => {
          state.status = "succeeded";
          switch (action.meta.arg.endpoint) {
            case "p2p-trades":
              state.p2pTrades = action.payload;
              break;
            case "spot-trades":
              state.spotTrades = action.payload;
              break;
            case "kline-intervals":
              state.klineIntervals = action.payload;
              break;
            case "assets":
              state.assets = action.payload;
              break;
            default:
              break;
          }
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("appData/api/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const selectKlineIntervals = (state) => state.appData.klineIntervals;
export const selectAssets = (state) => state.appData.assets;
export const selectP2PTrades = (state) => state.appData.p2pTrades;
export const selectAppDataStatus = (state) => state.appData.status;
export const selectAppDataError = (state) => state.appData.error;

export const { updateDefaultKlineOption } = appDataSlice.actions;
export default appDataSlice.reducer;

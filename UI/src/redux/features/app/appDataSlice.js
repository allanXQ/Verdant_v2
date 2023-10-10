import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  klineIntervals: [],
  assets: [],
  p2pTrades: [],
  spotTrades: [],
  status: "idle",
  error: null,
};

export const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    updateDefaultKlineOption: (state, action) => {
      const { value } = action.payload;
      state.klineIntervals = state.klineIntervals.map((option) =>
        option.value === value
          ? { ...option, default: true }
          : { ...option, default: false }
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith("api/call/pending"),
        (state, action) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("api/call/fulfilled"),
        (state, action) => {
          console.log(action.meta.arg.endpoint);

          if (action.payload.slice !== "appData") return;
          state.status = "succeeded";
          switch (action.meta.arg.endpoint) {
            case "app/p2p-trades":
              console.log(action.payload);
              state.p2pTrades = action.payload.data;
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
        (action) => action.type.startsWith("api/call/rejected"),
        (state, action) => {
          if (action.payload.slice !== "appData") return;
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

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rangePickerOptions: [
    {
      value: "1s",
      label: "1s",
    },
    {
      value: "1m",
      label: "1m",
    },
    {
      value: "3m",
      label: "3m",
    },
    {
      value: "5m",
      label: "5m",
      default: true,
    },
    {
      value: "15m",
      label: "15m",
    },
    {
      value: "30m",
      label: "30m",
    },
    {
      value: "1h",
      label: "1h",
      default: true,
      main: true,
    },
    {
      value: "2h",
      label: "2h",
    },
    {
      value: "4h",
      label: "4h",
    },
    {
      value: "6h",
      label: "6h",
    },
    {
      value: "8h",
      label: "8h",
    },
    {
      value: "12h",
      label: "12h",
    },
    {
      value: "1d",
      label: "1d",
      default: true,
    },
    {
      value: "3d",
      label: "3d",
    },
    {
      value: "1w",
      label: "1w",
    },
    {
      value: "1M",
      label: "1M",
    },
  ],
  assets: [],
  error: null,
};

export const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    updateDefaultRangePickerOption: (state, action) => {
      const { value } = action.payload;
      state.rangePickerOptions.forEach((option) => {
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

export const { updateDefaultRangePickerOption } = appDataSlice.actions;
export default appDataSlice.reducer;

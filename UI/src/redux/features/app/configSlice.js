import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",

  sideBar: {
    width: 0,
    isOpen: false,
    isCollapsed: false,
  },
  topBarHeight: 0,
};

export const configSlice = createSlice({
  name: "appThemeConfig",
  initialState,
  reducers: {
    updateTheme: (state, action) => {
      state.theme = "dark";
    },
  },
});

export const { updateTheme } = configSlice.actions;

export default configSlice.reducer;

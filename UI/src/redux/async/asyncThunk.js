import { createAsyncThunk } from "@reduxjs/toolkit";
import { reportError } from "redux/features/app/error";
import axiosInstance from "utils/axiosInstance";

export const apiCall = createAsyncThunk(
  "api/call",
  async ({ endpoint, method, data, slice }, thunkAPI) => {
    try {
      const response = await axiosInstance({
        method,
        url: `${endpoint}`,
        data,
        withCredentials: true,
      });
      if (response.status >= 400) {
        const errorMsg = response.data.message;
        thunkAPI.dispatch(reportError({ message: errorMsg, type: "info" }));
        return thunkAPI.rejectWithValue({
          error: errorMsg,
          status: response?.status,
        });
      }

      return { data: response.data.payload, slice };
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      thunkAPI.dispatch(reportError({ message: errorMsg, type: "info" }));
      return thunkAPI.rejectWithValue({
        error: errorMsg,
        slice,
        status: error.response?.status,
      });
    }
  }
);

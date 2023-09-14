import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
      return { data: response.data.payload, slice };
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue({
        error: errorMsg,
        slice,
        status: error.response?.status,
      });
    }
  }
);

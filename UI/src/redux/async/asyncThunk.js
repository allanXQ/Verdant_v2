import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const apiCall = createAsyncThunk(
  "api/call",
  async ({ endpoint, method, data, slice }, thunkAPI) => {
    try {
      const response = await axios({
        method,
        url: `${process.env.REACT_APP_SERVER_URL}/api/v1/${endpoint}`,
        data,
        withCredentials: true,
      });
      return { data: response.data.payload, slice };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response?.data.message || error.message,
        slice,
        status: error.response?.status,
      });
    }
  }
);

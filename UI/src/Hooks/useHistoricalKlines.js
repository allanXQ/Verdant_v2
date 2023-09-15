import { useDispatch } from "react-redux";
import { reportError } from "redux/features/app/error";
import axiosInstance from "utils/axiosInstance";

const useHistoricalKlines = async (assetName, klineInterval) => {
  let historicalData;
  try {
    const response = await axiosInstance({
      method: "POST",
      url: "http://localhost:5000/api/v1/app/historical-klines",
      data: {
        assetName,
        klineInterval,
      },
      withCredentials: true,
    });
    historicalData = response.data.payload;
    return historicalData;
  } catch (error) {
    useDispatch(reportError({ message: error.message, type: "error" }));
    return [];
  }
};

export default useHistoricalKlines;

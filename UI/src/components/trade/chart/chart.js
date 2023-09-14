import React, { useEffect, useRef, useState } from "react";
import { CrosshairMode, createChart } from "lightweight-charts";
import axios from "axios";
import { Box } from "@mui/material";
import axiosInstance from "utils/axiosInstance";
import { useSelector } from "react-redux";
import { selectTopBarHeight } from "redux/features/app/configSlice";
import { io } from "socket.io-client";

const CandleStickChart = ({ assetName, klineInterval }) => {
  const chartContainerRef = useRef(null);
  const resizeObserver = useRef(null);

  const [chart, setChart] = useState(null);
  const [ws, setWs] = useState(null);
  const topBarHeight = useSelector(selectTopBarHeight);

  const fetchHistoricalData = async (candlestickSeries) => {
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
      candlestickSeries.setData(historicalData);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const currentChartContainer = chartContainerRef.current;
    if (currentChartContainer) {
      const chartInstance = createChart(chartContainerRef.current, {
        autoSize: true,
        layout: {
          background: {
            color: "#253248",
          },
          textColor: "rgba(255, 255, 255, 0.9)",
        },
        grid: {
          vertLines: {
            color: "#334158",
          },
          horzLines: {
            color: "#334158",
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        priceScale: {
          borderColor: "#485c7b",
        },
        timeScale: {
          visible: false,
          borderColor: "#485c7b",
        },
      });

      setChart(chartInstance);

      resizeObserver.current = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        chartInstance.applyOptions({ width, height });
      });
      resizeObserver.current.observe(currentChartContainer);

      chartInstance.timeScale().scrollToPosition(5, true);

      const candlestickSeries = chartInstance.addCandlestickSeries({
        upColor: "#4bffb5",
        downColor: "#ff4976",
        borderDownColor: "#ff4976",
        borderUpColor: "#4bffb5",
        wickDownColor: "#838ca1",
        wickUpColor: "#838ca1",
      });

      fetchHistoricalData(candlestickSeries);

      // const socket = io("http://localhost:2000", {
      //   withCredentials: true,
      // });
      // socket.on("connect_error", (error) => {
      //   console.log("Connection Error: ", error);
      // });

      // socket.on("connect", () => {
      //   console.log(`Connected to /ws/${assetName}/${klineInterval}`);

      //   socket.emit("requestKlines", {
      //     assetName,
      //     klineInterval,
      //   });

      //   socket.on("klineData", (data) => {
      //     candlestickSeries.update(data.candlestick);
      //     console.log(data);
      //   });
      // });
      // setWs(socket);
    }

    return () => {
      currentChartContainer && (currentChartContainer.innerHTML = "");
      resizeObserver.current && resizeObserver.current.disconnect();
    };
  }, [assetName, klineInterval]);

  useEffect(() => {
    return () => {
      chart && chart.remove();
      ws && ws.close();
    };
  }, [chart, ws]); // Only chart and ws in the dependency array for cleanup

  return (
    <Box
      ref={chartContainerRef}
      sx={{
        width: "99.7vw",
        height: `calc(100vh - 3.5rem - ${topBarHeight})`,
        margin: "0",
        padding: "0",
      }}
    ></Box>
  );
};

export default CandleStickChart;

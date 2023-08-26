import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import axios from "axios";
import { io } from "socket.io-client";

const CandlestickChart = ({ assetName, klineInterval }) => {
  const chartContainerRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chartInstance = createChart(chartContainerRef.current, {
        width: 1000,
        height: 500,
      });
      const candlestickSeries = chartInstance.addCandlestickSeries();

      setChart(chartInstance);
      const fetchHistoricalData = async () => {
        let historicalData;
        await axios
          .post("http://localhost:5000/api/v1/asset-info/historical-klines", {
            assetName,
            klineInterval,
          })
          .then((res) => {
            historicalData = res.data.payload;
            console.log(historicalData);
            candlestickSeries.setData(historicalData);
          })
          .catch((err) => {
            console.log(err);
            return [];
          });

        return historicalData;
      };
      fetchHistoricalData();

      const socket = io("http://localhost:2000", {
        withCredentials: true,
      });
      socket.on("connect_error", (error) => {
        console.log("Connection Error: ", error);
      });

      socket.on("connect", () => {
        console.log(`Connected to /ws/${assetName}/${klineInterval}`);

        // Request klines data
        socket.emit("requestKlines", {
          assetName,
          klineInterval,
        });

        socket.on("klineData", (data) => {
          candlestickSeries.update(data.candlestick);
          console.log(data);
        });
      });
      setWs(socket);
    }

    return () => {
      chart && chart.remove();
      chartContainerRef.current && (chartContainerRef.current.innerHTML = "");
      ws && ws.close();
    };
  }, []);

  return (
    <div
      ref={chartContainerRef}
      style={{ width: "100%", height: "300px" }}
    ></div>
  );
};

export default CandlestickChart;

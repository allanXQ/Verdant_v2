import React, { useEffect, useRef, useState } from "react";
import { CrosshairMode, createChart } from "lightweight-charts";
import axios from "axios";
import { io } from "socket.io-client";

const CandleStickChart = ({ assetName, klineInterval }) => {
  const chartContainerRef = useRef(null);
  const resizeObserver = useRef(null);

  const [chart, setChart] = useState(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    if (chartContainerRef.current) {
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
      const candlestickSeries = chartInstance.addCandlestickSeries({
        upColor: "#4bffb5",
        downColor: "#ff4976",
        borderDownColor: "#ff4976",
        borderUpColor: "#4bffb5",
        wickDownColor: "#838ca1",
        wickUpColor: "#838ca1",
      });

      setChart(chartInstance);

      resizeObserver.current = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        chartInstance.applyOptions({ width, height });
      });
      resizeObserver.current.observe(chartContainerRef.current);

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

      // const socket = io("http://localhost:2000", {
      //   withCredentials: true,
      // });
      // socket.on("connect_error", (error) => {
      //   console.log("Connection Error: ", error);
      // });

      // socket.on("connect", () => {
      //   console.log(`Connected to /ws/${assetName}/${klineInterval}`);

      // Request klines data
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
      chart && chart.remove();
      chartContainerRef.current && (chartContainerRef.current.innerHTML = "");
      ws && ws.close();
      resizeObserver.current && resizeObserver.current.disconnect();
    };
  }, []);

  return (
    <div
      ref={chartContainerRef}
      style={{ width: "90vw", height: "500px" }}
    ></div>
  );
};

export default CandleStickChart;

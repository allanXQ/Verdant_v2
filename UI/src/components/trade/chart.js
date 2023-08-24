import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import axios from "axios";

const CandlestickChart = () => {
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
            assetName: "verdant",
            klineInterval: "1m",
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

      const binanceWs = new WebSocket(
        "wss://stream.binance.com:9443/ws/btcusdt@kline_1m"
      );

      binanceWs.onmessage = (message) => {
        const data = JSON.parse(message.data);
        const candlestick = {
          time: data.k.t,
          open: parseFloat(data.k.o),
          high: parseFloat(data.k.h),
          low: parseFloat(data.k.l),
          close: parseFloat(data.k.c),
        };

        candlestickSeries.update(candlestick);
      };

      setWs(binanceWs);
    }

    return () => {
      chart && chart.remove();
      chartContainerRef.current && (chartContainerRef.current.innerHTML = "");
      // ws && ws.close();
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

// websocket.js

import { io } from "socket.io-client";

const createWebSocket = (assetName, klineInterval) => {
  const socket = io("http://localhost:2000", {
    withCredentials: true,
  });
  const close = () => {
    socket.close();
  };

  const connect = () => {
    socket.connect();
  };

  const on = (event, callback) => {
    socket.on(event, callback);
  };

  const emit = (event, data) => {
    socket.emit(event, data);
  };

  return {
    connect,
    close,
    on,
    emit,
  };
};

export default createWebSocket;

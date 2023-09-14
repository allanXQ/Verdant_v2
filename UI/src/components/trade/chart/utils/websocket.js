// websocket.js

import { io } from "socket.io-client";

const createWebSocket = (
  url,
  options,
  maxRetries = 3,
  retryInterval = 2000
) => {
  let socket;
  let retries = 0;
  let shouldRetry = true;

  const connect = () => {
    socket = io(url, options);
    socket.on("connect_error", (error) => {
      console.error("Connection Error: ", error.message);
      if (retries < maxRetries) {
        retries++;
        setTimeout(connect, retryInterval);
      }
    });

    socket.on("connect", () => {
      console.log("Connected!");
      retries = 0;
    });

    socket.connect();
  };

  const close = () => {
    shouldRetry = false;
    socket.close();
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
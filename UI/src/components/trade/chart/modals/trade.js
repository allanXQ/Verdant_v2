import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import BuyForm from "components/forms/models/spot/buy";
import SellForm from "components/forms/models/spot/sell";
import createWebSocket from "../utils/websocket";
import { useDispatch } from "react-redux";

const style = {
  position: "relative",
  // top: "50%",
  right: 0,
  // transform: "translate(-50%, -50%)",
  // width: 270,
  bgcolor: "transparent",
  border: "none",
  boxShadow: "none",
  // p: 4,
};

const textFieldStyle = {
  width: "15rem",
  "& .Mui-focused": {
    backgroundColor: "transparent",
  },
  "& .MuiInputBase-input": {
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
};

const Child = ({ state }) => {
  const dispatch = useDispatch();
  const [price, setPrice] = React.useState("");
  const assetName = "verdant";
  useEffect(() => {
    if (!state) return;
    const socket = createWebSocket();
    socket.connect();
    socket.on("connect", () => {
      socket.emit("requestPrice", { assetName });
    });
    socket.on("priceData", (data) => {
      setPrice(data.price);
    });
    socket.on("connect_error", (error) => {
      dispatch(reportError({ message: error.message, type: "error" }));
      if (error.message === "server error") {
        socket.close();
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
      }}
    >
      <TextField
        label="Price"
        autoComplete="off"
        sx={textFieldStyle}
        value={price}
      />
      <TextField label="Total" autoComplete="off" sx={textFieldStyle} />
    </Box>
  );
};

const ModalComponent = ({ state, dispatch, title, FormComponent }) => {
  return (
    <Card sx={style}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          gap: 1,
        }}
      >
        <Typography variant="h5">{title}</Typography>
        <FormComponent>
          <Child state={state} />
        </FormComponent>
      </CardContent>
    </Card>
  );
};

export const Buy = ({ state, dispatch }) => {
  return (
    <ModalComponent
      state={state.buy}
      dispatch={dispatch}
      title="Buy"
      FormComponent={BuyForm}
    />
  );
};

export const Sell = ({ state, dispatch }) => {
  return (
    <ModalComponent
      state={state.sell}
      dispatch={dispatch}
      title="Sell"
      FormComponent={SellForm}
    />
  );
};

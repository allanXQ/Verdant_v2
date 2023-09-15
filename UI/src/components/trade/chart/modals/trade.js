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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const textFieldStyle = {
  width: "25rem",
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
  const [price, setPrice] = React.useState("");
  const assetName = "verdant";
  useEffect(() => {
    if (!state) return;
    const socket = createWebSocket();
    socket.connect();
    socket.on("connect", () => {
      console.log("connected");
      socket.emit("requestPrice", { assetName });
    });
    socket.on("priceData", (data) => {
      console.log("price data");
      setPrice(data.price);
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
    state && (
      <Modal
        open={state}
        onClose={() => dispatch({ type: "close" })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
      </Modal>
    )
  );
};

export const Buy = ({ state, dispatch }) => {
  // Place any Buy-specific logic here if needed

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
  // Place any Sell-specific logic here if needed

  return (
    <ModalComponent
      state={state.sell}
      dispatch={dispatch}
      title="Sell"
      FormComponent={SellForm}
    />
  );
};

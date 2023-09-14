import {
  Box,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import BuyForm from "components/forms/models/spot/buy";
import React, { useEffect } from "react";
import createWebSocket from "../utils/websocket";
import MUITextField from "components/forms/inputs/textField";
import SellForm from "components/forms/models/spot/sell";

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

const Child = () => {
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
      <TextField label="Price" autoComplete="off" sx={textFieldStyle} />
      <TextField label="Total" autoComplete="off" sx={textFieldStyle} />
    </Box>
  );
};

export const Buy = ({ state, dispatch }) => {
  //   useEffect(() => {
  //     if (state.buy) {
  //       const socket = createWebSocket();
  //       socket.on("connect", () => {
  //         socket.emit("requestPrice", {
  //           assetName,
  //         });

  //         socket.on("priceData", (data) => {
  //           console.log(data);
  //         });
  //       });
  //     }
  //   });
  return (
    state.buy && (
      <Modal
        open={state.buy}
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
            <Typography variant="h5">Buy</Typography>
            <BuyForm>
              <Child />
            </BuyForm>
          </CardContent>
        </Card>
      </Modal>
    )
  );
};

export const Sell = ({ state, dispatch }) => {
  //   useEffect(() => {
  //     if (state.buy) {
  //       const socket = createWebSocket();
  //       socket.on("connect", () => {
  //         socket.emit("requestPrice", {
  //           assetName,
  //         });

  //         socket.on("priceData", (data) => {
  //           console.log(data);
  //         });
  //       });
  //     }
  //   });
  return (
    state.sell && (
      <Modal
        open={state.sell}
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
            <Typography variant="h5">Sell</Typography>
            <SellForm>
              <Child />
            </SellForm>
          </CardContent>
        </Card>
      </Modal>
    )
  );
};

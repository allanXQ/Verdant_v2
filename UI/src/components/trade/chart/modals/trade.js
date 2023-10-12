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
import createWebSocket from "../../../../utils/websocket";
import { useDispatch, useSelector } from "react-redux";
import { reportError } from "redux/features/app/error";
import { selectActiveAsset } from "redux/features/app/appDataSlice";

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
        <FormComponent />
      </CardContent>
    </Card>
  );
};

export const Buy = ({ state, dispatch }) => {
  return <ModalComponent title="Buy" FormComponent={BuyForm} />;
};

export const Sell = ({ state, dispatch }) => {
  return <ModalComponent title="Sell" FormComponent={SellForm} />;
};

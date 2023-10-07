import { Box, Button, Typography } from "@mui/material";
import useUserData from "Hooks/useUserData";
import MuiButton from "components/common/Button";
import MUIDataGrid from "components/common/Datagrid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiCall } from "redux/async/asyncThunk";
import { selectP2PTrades } from "redux/features/app/appDataSlice";

const ActionButton = ({ type }) => {
  const navigate = useNavigate();

  return (
    <MuiButton
      variant="contained"
      onClick={() => navigate(type.toLowerCase() === "sell" ? "/buy" : "/sell")}
      content={type.toLowerCase() === "sell" ? "Buy" : "Sell"}
    />
  );
};

const columns = [
  { field: "Type", headerName: "Type", width: 210 },
  { field: "Asset", headerName: "Asset", width: 210 },
  { field: "Amount", headerName: "Amount", width: 210 },
  { field: "Price", headerName: "Price", width: 200 },
  {
    field: "action",
    headerName: "Action",
    width: 210,
    renderCell: (params) => {
      return <ActionButton type={params.row.Type} />;
    },
  },
];

const Overview = ({ userData }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        maxWidth: "95%",
      }}
    >
      <Box>
        <Typography variant="subtitle1">Portfolio Value</Typography>
        <Typography variant="h6">KSH {userData?.portfolioValue}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MuiButton
          variant="contained"
          onClick={() => navigate("/trade/spot")}
          content="Spot"
        />

        <MuiButton
          variant="contained"
          onClick={() => navigate("/trade/swap")}
          content="Swap"
        />
      </Box>
    </Box>
  );
};

const PeerTrading = () => {
  const dispatch = useDispatch();
  const userData = useUserData();

  useEffect(() => {
    dispatch(apiCall({ endpoint: "app/p2p-trades", method: "GET" }));
  }, [dispatch]);

  const p2pTrades = useSelector(selectP2PTrades);

  const rows = p2pTrades.map((trade) => {
    const { type, stockName, stockAmount, price } = trade;
    return {
      id: trade._id,
      Type: type,
      Asset: stockName,
      Amount: stockAmount,
      Price: price,
    };
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        marginTop: "2rem",
        gap: "2rem",
        overflow: "hidden",
      }}
    >
      <Overview userData={userData} />

      <MUIDataGrid title="P2P" columns={columns} rows={rows} />
    </Box>
  );
};

export default PeerTrading;

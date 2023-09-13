import { Box, Button, Typography } from "@mui/material";
import useUserData from "Hooks/useUserData";
import MUIDataGrid from "components/common/Datagrid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAppData, selectP2PTrades } from "redux/features/app/appDataSlice";

const columns = [
  { field: "Type", headerName: "Type", width: 210 },
  { field: "Asset", headerName: "Asset", width: 210 },
  { field: "Amount", headerName: "Amount", width: 210 },
  { field: "Price", headerName: "Price", width: 200 },
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
        <Button variant="contained" onClick={() => navigate("/trade/spot")}>
          Spot
        </Button>
        <Button variant="contained" onClick={() => navigate("/trade/swap")}>
          Swap
        </Button>
      </Box>
    </Box>
  );
};

const PeerTrading = () => {
  const dispatch = useDispatch();
  const userData = useUserData();

  useEffect(() => {
    dispatch(fetchAppData({ endpoint: "p2p-trades", method: "GET" }));
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

import { Box } from "@mui/material";
import MUIDataGrid from "components/common/Datagrid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppData, selectP2PTrades } from "redux/features/app/appDataSlice";

const columns = [
  { field: "Type", headerName: "Type", width: 210 },
  { field: "Asset", headerName: "Asset", width: 210 },
  { field: "Amount", headerName: "Amount", width: 210 },
  { field: "Price", headerName: "Price", width: 200 },
];

const PeerTrading = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAppData({ endpoint: "p2p-trades", method: "GET" }));
  }, [dispatch]);

  const p2pTrades = useSelector(selectP2PTrades);
  console.log(p2pTrades);

  const rows = p2pTrades.map((trade) => {
    const { type, stockName, amount, price } = trade;
    return {
      id: trade._id,
      Type: type,
      Asset: stockName,
      Amount: amount,
      Price: price,
    };
  });
  return (
    <Box>
      <MUIDataGrid title="Deposit History" columns={columns} rows={rows} />
    </Box>
  );
};

export default PeerTrading;

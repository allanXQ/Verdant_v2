import { Box, Button, Typography } from "@mui/material";
import useUserData from "Hooks/useUserData";
import MUIDataGrid from "components/common/Datagrid";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAPI } from "redux/features/user/userSlice";

const columns = [
  { field: "Gateway", headerName: "Gateway", width: 210 },
  { field: "ReferenceNumber", headerName: "Reference Number", width: 210 },
  { field: "Amount", headerName: "Amount", width: 210 },
  { field: "Status", headerName: "Status", width: 200 },
  { field: "Date", headerName: "Date", width: 210 },
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
        <Typography variant="subtitle1">Available Balance</Typography>
        <Typography variant="h6">KSH {userData?.accountBalance}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/transact/Withdrawal")}
        >
          Deposit
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/transact/withdraw")}
        >
          WIthdraw
        </Button>
      </Box>
    </Box>
  );
};

const WithdrawalHistory = () => {
  const dispatch = useDispatch();
  const userData = useUserData();

  useEffect(() => {
    dispatch(
      userAPI({
        endpoint: "/user/user-info",
        method: "post",
        data: { userId: userData.userId },
      })
    );
  }, [dispatch, userData.userId]);

  const rows =
    Array.isArray(userData?.withdrawals) &&
    userData.withdrawals.map((withdrawal) => {
      return {
        id: withdrawal._id,
        Gateway: "Mpesa",
        ReferenceNumber: withdrawal._id,
        Amount: `KSH ${withdrawal.amount}`,
        Status: withdrawal.status,
        Date: withdrawal.created,
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
      {/* search bar 
      add gateway icon
      red and green status
      add filters(gateway, status, date)
      */}
      <Overview userData={userData} />

      <MUIDataGrid title="Withdrawal History" columns={columns} rows={rows} />
    </Box>
  );
};

export default WithdrawalHistory;

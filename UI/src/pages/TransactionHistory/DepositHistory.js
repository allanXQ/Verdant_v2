import { Box, Button, Divider, Typography } from "@mui/material";
import MUIDataGrid from "components/common/Datagrid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser, userAPI } from "redux/features/user/userSlice";

const columns = [
  { field: "Gateway", headerName: "Gateway", width: 210 },
  { field: "ReferenceNumber", headerName: "Reference Number", width: 210 },
  { field: "Amount", headerName: "Amount", width: 210 },
  { field: "Status", headerName: "Status", width: 210 },
  { field: "Date", headerName: "Date", width: 210 },
];

const rows = [
  {
    id: 1,
    Gateway: "Mpesa",
    ReferenceNumber: "123456789",
    Amount: "Ksh 1000",
    Status: "Success",
    Date: "12/10/2021",
  },
  {
    id: 2,
    Gateway: "Mpesa",
    ReferenceNumber: "123456789",
    Amount: "Ksh 1000",
    Status: "Success",
    Date: "12/10/2021",
  },
  {
    id: 3,
    Gateway: "Mpesa",
    ReferenceNumber: "123456789",
    Amount: "Ksh 1000",
    Status: "Success",
    Date: "12/10/2021",
  },
  {
    id: 4,
    Gateway: "Mpesa",
    ReferenceNumber: "123456789",
    Amount: "Ksh 1000",
    Status: "Success",
    Date: "12/10/2021",
  },
  {
    id: 5,
    Gateway: "Mpesa",
    ReferenceNumber: "123456789",
    Amount: "Ksh 1000",
    Status: "Success",
    Date: "12/10/2021",
  },
  {
    id: 6,
    Gateway: "Mpesa",
    ReferenceNumber: "123456789",
    Amount: "Ksh 1000",
    Status: "Success",
    Date: "12/10/2021",
  },
  {
    id: 1,
    Gateway: "Mpesa",
    ReferenceNumber: "123456789",
    Amount: "Ksh 1000",
    Status: "Success",
    Date: "12/10/2021",
  },
  {
    id: 2,
    Gateway: "Mpesa",
    ReferenceNumber: "123456789",
    Amount: "Ksh 1000",
    Status: "Success",
    Date: "12/10/2021",
  },
  {
    id: 3,
    Gateway: "Mpesa",
    ReferenceNumber: "123456789",
    Amount: "Ksh 1000",
    Status: "Success",
    Date: "12/10/2021",
  },
  {
    id: 4,
    Gateway: "Mpesa",
    ReferenceNumber: "123456789",
    Amount: "Ksh 1000",
    Status: "Success",
    Date: "12/10/2021",
  },
  {
    id: 5,
    Gateway: "Mpesa",
    ReferenceNumber: "123456789",
    Amount: "Ksh 1000",
    Status: "Success",
    Date: "12/10/2021",
  },
  {
    id: 6,
    Gateway: "Mpesa",
    ReferenceNumber: "123456789",
    Amount: "Ksh 1000",
    Status: "Success",
    Date: "12/10/2021",
  },
];

const Overview = () => {
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
        <Typography variant="h6">KSH 1000</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button variant="contained">Deposit</Button>
        <Button variant="contained">WIthdraw</Button>
      </Box>
    </Box>
  );
};

const DepositHistory = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);

  useEffect(() => {
    dispatch(
      userAPI({
        endpoint: "/user/user-info", // Replace with your endpoint
        method: "post", // Replace with your HTTP method
        data: { userId: userData.userId }, // Replace with your data, if any
      })
    );
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        marginTop: "2rem",
        gap: "2rem",
      }}
    >
      {/* search bar 
      add gateway icon
      red and green status
      add filters(gateway, status, date)
      */}
      <Overview />

      <MUIDataGrid title="Deposit History" columns={columns} rows={rows} />
    </Box>
  );
};

export default DepositHistory;

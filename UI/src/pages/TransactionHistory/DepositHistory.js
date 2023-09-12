import { Box, Button, Divider, Typography } from "@mui/material";
import MUIDataGrid from "components/common/Datagrid";
import React from "react";

const columns = [
  { field: "Gateway", headerName: "Gateway", width: 208 },
  { field: "ReferenceNumber", headerName: "Reference Number", width: 208 },
  { field: "Amount", headerName: "Amount", width: 208 },
  { field: "Status", headerName: "Status", width: 208 },
  { field: "Date", headerName: "Date", width: 208 },
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
];

const Overview = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography>
          Balance <span> Ksh 1000</span>
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box>
        <Typography>
          Deposits <span> Ksh 500</span>
        </Typography>
      </Box>
    </Box>
  );
};

const DepositHistory = () => {
  return (
    <Box
      sx={{
        width: "90%",
      }}
    >
      {/* search bar 
      add gateway icon
      red and green status
      add filters(gateway, status, date)
      */}
      <Overview />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ mt: 2 }}>
          Deposit History
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          Deposit
        </Button>
      </Box>

      <MUIDataGrid columns={columns} rows={rows} />
    </Box>
  );
};

export default DepositHistory;

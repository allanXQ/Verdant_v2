import { Grid } from "@mui/material";
import useUserData from "Hooks/useUserData";
import MUIDataGrid from "components/common/Datagrid";
import React from "react";
import { Overview } from "./overview";
import MainHistory from "./historyMain";

const columns = [
  { field: "Gateway", headerName: "Gateway", width: 200 },
  { field: "ReferenceNumber", headerName: "Reference Number", width: 200 },
  { field: "AccountNumber", headerName: "Accout Number", width: 200 },
  { field: "Amount", headerName: "Amount", width: 200 },
  { field: "Status", headerName: "Status", width: 150 },
  { field: "Date", headerName: "Date", width: 200 },
];

const DepositHistory = () => {
  const userData = useUserData();
  const buttons = [
    {
      name: "Deposit",
      path: "/transact/deposit",
    },
    {
      name: "Withdraw",
      path: "/transact/withdraw",
    },
  ];

  const rows =
    Array.isArray(userData?.deposits) &&
    userData.deposits.map((deposit) => {
      return {
        id: deposit._id,
        Gateway: "Mpesa",
        ReferenceNumber: deposit.mpesaRef,
        AccountNumber: deposit.phone,
        Amount: `KSH ${deposit.amount}`,
        Status: "success",
        Date: deposit.created,
      };
    });

  return (
    <MainHistory
      title="Deposit History"
      columns={columns}
      rows={rows}
      userInfo={{
        accountBalance: userData?.accountBalance,
        name: "Account Balance",
      }}
      buttons={buttons}
    />
  );
};

export default DepositHistory;

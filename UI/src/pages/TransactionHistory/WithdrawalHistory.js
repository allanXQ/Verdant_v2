import { Box } from "@mui/material";
import useUserData from "Hooks/useUserData";
import MUIDataGrid from "components/common/Datagrid";
import { Overview } from "./overview";

const columns = [
  { field: "Gateway", headerName: "Gateway", width: 210 },
  { field: "ReferenceNumber", headerName: "Reference Number", width: 210 },
  { field: "Amount", headerName: "Amount", width: 210 },
  { field: "Status", headerName: "Status", width: 200 },
  { field: "Date", headerName: "Date", width: 210 },
];

const WithdrawalHistory = () => {
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
      <Overview
        userData={{
          accountBalance: userData?.accountBalance,
          name: "Account Balance",
        }}
        buttons={buttons}
      />

      <MUIDataGrid title="Withdrawal History" columns={columns} rows={rows} />
    </Box>
  );
};

export default WithdrawalHistory;

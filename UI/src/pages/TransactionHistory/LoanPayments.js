import { Box } from "@mui/material";
import useUserData from "Hooks/useUserData";
import MUIDataGrid from "components/common/Datagrid";
import { Overview } from "./overview";

const columns = [
  { field: "Gateway", headerName: "Gateway", width: 200 },
  { field: "LoanId", headerName: "LoanId", width: 200 },
  { field: "Amount", headerName: "Amount", width: 200 },

  { field: "Status", headerName: "Status", width: 200 },
  { field: "Date", headerName: "Date", width: 200 },
];

const LoanPayments = () => {
  const userData = useUserData();
  const buttons = [
    {
      name: "Request Loan",
      path: "/transact/request-loan",
    },
    {
      name: "Loan Payments",
      path: "/history/loan-payments",
    },
  ];

  const rows = Array.isArray(userData?.LoanPayments)
    ? userData.LoanPayments.map((request) => {
        return {
          id: request._id,
          Gateway: "Mpesa",
          LoanId: request.LoanId,
          Amount: `KSH ${request.amount}`,
          Status: request.status,
          Date: request.created,
        };
      })
    : [];

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

      <MUIDataGrid title="Loan Payments" columns={columns} rows={rows} />
    </Box>
  );
};

export default LoanPayments;

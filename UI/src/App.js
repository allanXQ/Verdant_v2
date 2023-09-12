import { Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./components/Layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import DepositHistory from "pages/TransactionHistory/DepositHistory";
import Login from "pages/Auth/login";
import Trade from "pages/Trade";
import GoogleCallback from "pages/Auth/googleCallback";
import Logout from "pages/Auth/logout";
import Register from "pages/Auth/register";
import ForgotPassword from "pages/Auth/forgotPassword";
import Deposit from "pages/Transact/deposit";
import Withdrawal from "pages/Transact/withdraw";
import WithdrawalHistory from "pages/TransactionHistory/WithdrawalHistory";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />

      <Route path="logout" element={<Logout />} />
      <Route path="google-callback" element={<GoogleCallback />} />

      <Route element={<RootLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="history">
          <Route path="deposits" element={<DepositHistory />} />
          <Route path="withdrawals" element={<WithdrawalHistory />} />
        </Route>
        <Route path="transact">
          <Route path="deposit" element={<Deposit />} />
          <Route path="withdraw" element={<Withdrawal />} />
        </Route>
        <Route path="trade" element={<Trade />} />
      </Route>
    </Routes>
  );
}

export default App;

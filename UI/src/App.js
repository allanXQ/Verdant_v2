import { Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "components/Layouts/RootLayout";
import Dashboard from "pages/Dashboard";
import DepositHistory from "pages/TransactionHistory/DepositHistory";
import Login from "pages/Auth/login";
import Trade from "pages/Trade/spot";
import GoogleCallback from "pages/Auth/googleCallback";
import Logout from "pages/Auth/logout";
import Register from "pages/Auth/register";
import ForgotPassword from "pages/Auth/forgotPassword";
import Deposit from "pages/Transact/deposit";
import Withdrawal from "pages/Transact/withdraw";
import WithdrawalHistory from "pages/TransactionHistory/WithdrawalHistory";
import PeerTrading from "pages/Trade/peer";
import Swap from "pages/Trade/swap";
import MessageModal from "components/messages";
import Home from "pages/Home";
import HomeLayout from "components/Layouts/HomeLayout";

function App() {
  return (
    <>
      <MessageModal />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route element={<HomeLayout />}>
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

        <Route path="logout" element={<Logout />} />
        <Route path="google-callback" element={<GoogleCallback />} />

        <Route element={<RootLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="history">
            <Route path="deposits" element={<DepositHistory />} />
            <Route path="withdrawals" element={<WithdrawalHistory />} />
          </Route>
          <Route path="transact">
            <Route path="deposit" element={<Deposit />} />
            <Route path="withdraw" element={<Withdrawal />} />
          </Route>
          <Route path="trade">
            <Route path="spot" element={<Trade />} />
            <Route path="p2p" element={<PeerTrading />} />
            <Route path="swap" element={<Swap />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

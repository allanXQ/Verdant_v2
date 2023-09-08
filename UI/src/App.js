import { Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./components/Layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import DepositHistory from "pages/TransactionHistory/DepositHistory";
import Login from "pages/Auth/login";
import Trade from "pages/Trade";
import GoogleCallback from "pages/Auth/googleCallback";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="google-callback" element={<GoogleCallback />} />

      <Route element={<RootLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="deposit-history" element={<DepositHistory />} />
        <Route path="trade" element={<Trade />} />
      </Route>
    </Routes>
  );
}

export default App;

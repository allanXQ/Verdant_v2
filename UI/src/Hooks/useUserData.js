import { useSelector } from "react-redux";
import { selectUser } from "redux/features/user/userSlice";

const useUserData = () => {
  const user = useSelector(selectUser);
  const {
    userId,
    firstName,
    lastName,
    email,
    phoneNumber,
    status,
    portfolio,
    trades,
    mpesaDeposits,
    stripeDeposits,
    withdrawals,
    transfers,
    accountBalance,
    referrer,
    referrals,
  } = user;

  const deposits = mpesaDeposits; //[...mpesaDeposits, ...stripeDeposits];

  return {
    userId,
    firstName,
    lastName,
    email,
    phoneNumber,
    status,
    portfolio,
    trades,
    deposits,
    withdrawals,
    transfers,
    accountBalance,
    referrer,
    referrals,
  };
};

export default useUserData;

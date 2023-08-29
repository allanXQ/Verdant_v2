const router = require("express").Router();
const formValidate = require("../../middleware/validate");
const { verifyjwt } = require("../../middleware/verifyjwt");
const {
  UpdatePassword,
  Login,
  Register,
  ResetPassword,
  ForgotPassword,
  RefreshToken,
  Logout,
  googleOAuth,
  userInfo,

  MpesaWithdraw,
  TinypesaWebhook,
  MpesaDeposit,
  MpesaDepositHistory,
  WithdrawalHistory,

  buyLimit,
  cancelOrder,
  createBuyOrder,
  createSellOrder,
  sellLimit,
  tradeHistory,
} = require("../../controllers/user/index");
const {
  regSchema,
  loginSchema,
  updatePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  depositSchema,
  withdrawalSchema,
  p2pOrderSchema,
  cancelOrderSchema,
} = require("../../yupschemas");

const errorHOC = require("../../utils/errorHOC");

//auth routes
router.post("/auth/register", formValidate(regSchema), Register);
router.post("/auth/login", formValidate(loginSchema), Login);
router.post(
  "/auth/reset-password/:id/:token",
  formValidate(resetPasswordSchema),
  ResetPassword
);
router.post("/auth/refresh-token", RefreshToken);
router.post("/auth/logout", Logout);

router.post(
  "/auth/forgot-password",
  formValidate(forgotPasswordSchema),
  ForgotPassword
);
router.post(
  "/auth/update-password",
  verifyjwt,
  formValidate(updatePasswordSchema),
  UpdatePassword
);

router.get("/auth/google", googleOAuth);

//wallet routes
router.post(
  "/transact/mpesa/deposit",
  verifyjwt,
  formValidate(depositSchema),
  MpesaDeposit
);
router.post("/transact/tinypesa/webhook", TinypesaWebhook);
router.post(
  "/transact/withdraw",
  verifyjwt,
  formValidate(withdrawalSchema),
  MpesaWithdraw
);

router.get("/history/deposit", verifyjwt, MpesaDepositHistory);
router.get("/history/withdrawal", verifyjwt, WithdrawalHistory);

//portfolio routes
router.get("/history/trade/:stockname", verifyjwt, tradeHistory); //if param return all sells for that stock by user else return all sells by user
router.post(
  "/trade/sell-order",
  verifyjwt,
  formValidate(p2pOrderSchema),
  createSellOrder
);
router.post(
  "/trade/buy-order",
  verifyjwt,
  formValidate(p2pOrderSchema),
  createBuyOrder
);
router.post(
  "/trade/sell-limit",
  verifyjwt,
  formValidate(p2pOrderSchema),
  sellLimit
);
router.post(
  "/trade/buy-limit",
  verifyjwt,
  formValidate(p2pOrderSchema),
  buyLimit
);
router.post(
  "/trade/cancel-order",
  verifyjwt,
  formValidate(cancelOrderSchema),
  cancelOrder
);

router.post(
  "/user-info",
  //   verifyjwt,
  //   formValidate(),
  errorHOC(userInfo)
);

module.exports = router;

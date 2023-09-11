const { default: mongoose } = require("mongoose");
const { WalletConfig } = require("../../../config");
const Messages = require("../../../utils/messages");
const User = require("../../../models/users");
const Withdraw = require("../../../models/withdrawals");

//include withdrrawal fees

const MpesaWithdraw = async (req, res) => {
  let session;
  try {
    const { phone, amount } = req.body;
    console.log(phone, amount);
    const { minWithdrawal, withdrawalFeePercentage } = WalletConfig;
    let intAmount = parseInt(amount);
    const getUser = await User.findOne({ phone });
    if (!getUser) {
      return res.status(400).json({ message: Messages.userNotFound });
    }
    const getBalance = parseInt(getUser.accountBalance);
    const username = getUser.username;
    const taxAmount = intAmount * withdrawalFeePercentage;
    const totalAmount = intAmount + taxAmount;

    if (getBalance < minWithdrawal) {
      return res.status(400).json({
        message: Messages.insufficientBalance,
      });
    }

    if (intAmount < minWithdrawal) {
      return res.status(400).json({
        message: Messages.minWithdrawal + ` ${minWithdrawal}`,
      });
    }

    if (intAmount > getBalance) {
      return res.status(400).json({
        message: Messages.insufficientBalance,
      });
    }

    if (getBalance - totalAmount < 0) {
      return res.status(400).json({
        message: Messages.insufficientBalance,
      });
    }

    session = await mongoose.startSession();
    session.startTransaction();

    await Withdraw.create(
      {
        userId: getUser.userId,
        username,
        phone,
        amount: intAmount,
        mode: "mpesa",
      },
      { session }
    );
    const updateUser = await User.updateOne(
      { username },
      {
        $inc: { accountBalance: -totalAmount },
      },
      { session, new: true }
    );
    if (updateUser.nModified === 0) {
      return res.status(400).json({ message: Messages.withdrawalFailed });
    }
    await session.commitTransaction();
    session && session.endSession();
    return res.status(200).json({ message: Messages.withdrawalSuccess });
  } catch (error) {
    session && (await session.abortTransaction());
    session && session.endSession();
    throw error;
  }
};

module.exports = { MpesaWithdraw };

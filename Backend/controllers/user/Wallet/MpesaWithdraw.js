const { default: mongoose } = require("mongoose");
const { WalletConfig } = require("../../../config");
const Messages = require("../../../utils/messages");
const User = require("../../../models/users");
const Withdraw = require("../../../models/withdrawals");

//include withdrrawal fees
const MpesaWithdraw = async (req, res) => {
  let session;
  let isCommited = false;
  try {
    const { phone, amount } = req.body;
    const { minWithdrawal, withdrawalFeePercentage } = WalletConfig;

    let intAmount = parseInt(amount) || 0;

    // Validate amount before proceeding
    if (intAmount < minWithdrawal) {
      return res.status(400).json({
        message: `${Messages.minWithdrawal} ${minWithdrawal}`,
      });
    }

    const taxAmount = intAmount * withdrawalFeePercentage;
    const totalAmount = intAmount + taxAmount;

    session = await mongoose.startSession();
    session.startTransaction();

    const updatedUser = await User.findOneAndUpdate(
      { phone },
      { $inc: { accountBalance: -totalAmount } },
      { session, new: true, returnOriginal: false }
    );

    if (!updatedUser) {
      return res.status(400).json({ message: Messages.userNotFound });
    }

    const remainingBalance = parseInt(updatedUser.accountBalance) || 0;

    // Validate the remaining balance
    if (remainingBalance < 0) {
      throw new Error(Messages.insufficientBalance);
    }

    await Withdraw.create(
      [
        {
          userId: updatedUser.userId,
          username: updatedUser.username,
          phone,
          amount: intAmount,
          mode: "mpesa",
        },
      ],
      { session }
    );

    const withdrawals = await Withdraw.find({
      userId: updatedUser.userId,
    }).session(session);

    await session.commitTransaction();
    isCommited = true;
    const user = {
      ...updatedUser.toObject(),
      withdrawals,
    };

    return res.status(200).json({
      message: Messages.withdrawalSuccess,
      payload: {
        user,
      },
    });
  } catch (error) {
    if (session && !isCommited) {
      await session.abortTransaction();
    }

    return res.status(400).json({ message: Messages.serverError });
  } finally {
    session.endSession();
  }
};

module.exports = { MpesaWithdraw };

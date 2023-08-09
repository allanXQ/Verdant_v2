const { default: mongoose } = require("mongoose");
const { orderTypes } = require("../../../config");
const buyOrders = require("../../../models/p2p/BuyOrders");
const Escrow = require("../../../models/p2p/escrow");
const Users = require("../../../models/Users");
const Messages = require("../../../utils/messages");
const crypto = require("crypto");
//check if account balance is sufficient
//deduct asset value from account balance
//store the asset value in escrow
//create a buy order

const createBuyOrder = async (req, res) => {
  const { userId, username, stockName, stockAmount, price } = req.body;
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const user = await Users.findOne({ userId }).session(session);
    const accountBalance = parseInt(user.accountBalance);
    const assetValue = parseInt(stockAmount) * parseInt(price);
    if (accountBalance < assetValue) {
      return res.json({
        status: 400,
        message: Messages.insufficientBalance,
      });
    }
    user.accountBalance -= assetValue;

    await user.save({ session });
    const orderId = crypto.randomBytes(6).toString("hex");
    await Escrow.create(
      {
        orderId,
        orderType: orderTypes.Buy,
        userId,
        cashAmount: assetValue,
      },
      { session }
    );

    const buyOrder = await buyOrders.create(
      {
        orderId,
        buyerId: userId,
        buyerName: username,
        stockName,
        stockAmount,
        price,
      },
      { session }
    );
    await session.commitTransaction();
    return res.json({
      status: 200,
      payload: buyOrder,
      message: Messages.orderCreated,
    });
  } catch (error) {
    session && (await session.abortTransaction());
    console.log(error);
    return res.json({ status: 500, message: Messages.serverError });
  } finally {
    session && session.endSession();
  }
};

module.exports = createBuyOrder;

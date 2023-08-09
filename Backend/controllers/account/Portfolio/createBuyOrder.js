const orderTypes = require("../../../config/orderTypes");
const buyOrders = require("../../../models/p2p/buyOrders");
const Escrow = require("../../../models/p2p/escrow");
const Users = require("../../../models/Users");
const Messages = require("../../../utils/messages");
const crypto = require("crypto");
const id = crypto.randomBytes(6).toString("hex");
//check if account balance is sufficient
//deduct asset value from account balance
//store the asset value in escrow
//create a buy order

const createbuyOrder = async (req, res) => {
  const { userId, username, stockName, stockAmount, price } = req.body;

  try {
    const session = await mongoose.startSession();
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
    accountBalance -= assetValue;

    await user.save({ session });
    const orderId = id;
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
    await session.abortTransaction();
    console.log(error);
    return res.json({ status: 500, message: Messages.serverError });
  } finally {
    session.endSession();
  }
};

module.exports = createbuyOrder;

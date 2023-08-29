const { default: mongoose } = require("mongoose");
const SellOrders = require("../../../models/p2p/sellOrders");
const Escrow = require("../../../models/p2p/escrow");
const Users = require("../../../models/users");
const Messages = require("../../../utils/messages");
const { orderTypes } = require("../../../config");
const createId = require("../../../utils/createId");

//check if portfolio balance is sufficient
//deduct asset amount from portfolio balance
//store the asset amount and name in escrow
//create a sell order

const createSellOrder = async (req, res) => {
  const { userId, username, stockName, stockAmount, price } = req.body;
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const user = await Users.findOne({ userId }).session(session);
    const portfolio = user.portfolio;
    const stock = portfolio.find((stock) => stock.stockName === stockName);
    if (!stock || parseInt(stock.stockAmount) < parseInt(stockAmount)) {
      return res.json({
        status: 400,
        message: Messages.insufficientStocks,
      });
    }
    stock.stockAmount = parseInt(stock.stockAmount) - parseInt(stockAmount);
    await user.save({ session });
    const orderId = createId();
    await Escrow.create({
      orderId,
      orderType: orderTypes.Sell,
      userId,
      stockName,
      stockAmount,
    });

    const sellOrder = await SellOrders.create(
      {
        orderId,
        sellerId: userId,
        sellerName: username,
        stockName,
        stockAmount,
        price,
      },
      { session }
    );
    await session.commitTransaction();
    return res.json({
      status: 200,
      payload: sellOrder,
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

module.exports = createSellOrder;
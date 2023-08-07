const SellOrders = require("../../../models/p2p/SellOrders");
const Users = require("../../../models/user");
const Messages = require("../../../utils/messages");

const createSellOrder = async (req, res) => {
  const { userId, username, stockName, stockAmount, price } = req.body;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const user = await Users.findOne({ userId }).session(session);
    const portfolio = user.portfolio;
    const stock = portfolio.find((stock) => stock.stockName === stockName);
    if (stock.stockAmount < stockAmount) {
      return res.json({
        status: 400,
        message: Messages.insufficientStocks,
      });
    }
    stock.stockAmount -= stockAmount;
    await user.save({ session });

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
    return res.json({
      status: 200,
      payload: sellOrder,
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

module.exports = createSellOrder;

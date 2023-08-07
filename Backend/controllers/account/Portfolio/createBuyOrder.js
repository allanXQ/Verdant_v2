const buyOrders = require("../../../models/p2p/buyOrders");
const Users = require("../../../models/user");
const Messages = require("../../../utils/messages");

//check if account balance is sufficient
//deduct asset value from account balance and store in escrow
// deduct amount from user balance
//create a buy order

const createbuyOrder = async (req, res) => {
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

    const buyOrder = await buyOrders.create(
      {
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

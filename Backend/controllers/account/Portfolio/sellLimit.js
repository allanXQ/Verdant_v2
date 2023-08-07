const Messages = require("../../../utils/messages");
const closedTrades = require("../../../models/p2p/closedTrades");
const Users = require("../../../models/user");
const BuyOrders = require("../../../models/p2p/BuyOrders");

//check if buy order exists
//check if seller has sufficient balance
//update seller balance
//update buyer balance
//remove order from buyorders
//create a complete trade

const Sell = async (req, res) => {
  const { userId, buyerId, orderId, stockName, stockAmount, price } = req.body;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    //check order existence
    const Order = await BuyOrders.findOne({ orderId });
    if (!Order) {
      return res.status(400).json({ message: Messages.invalidRequest });
    }

    //check && update seller portfolio
    const user = await Users.findOne({ userId }).session(session);
    const portfolio = user.portfolio;
    const stock = portfolio.find((stock) => stock.stockName === stockName);
    if (!stock || parseInt(stock.amountOwned) < parseInt(stockAmount)) {
      return res.json({
        status: 400,
        message: Messages.insufficientStocks,
      });
    }

    //check && update buyer portfolio
    const findBuyer = await Users.findOne({ userId: buyerId }).session(session);
    if (!findBuyer) {
      return res.status(400).json({ message: Messages.invalidRequest });
    }
    const buyerPortfolio = findBuyer.portfolio;
    const buyerStock = buyerPortfolio.find(
      (stock) => stock.stockName === stockName
    );

    if (!buyerStock) {
      await Users.updateOne(
        { userId: buyerId },
        {
          $push: {
            portfolio: {
              ownerId: buyerId,
              stockName,
              stockAmount,
            },
          },
        },
        { session }
      );
    } else {
      buyerStock.amountOwned =
        parseInt(buyerStock.amountOwned) + parseInt(stockAmount);
      await findBuyer.save({ session });
    }

    //update/delete buy order from buy orders
    if (parseInt(Order.stockAmount) <= 0) {
      //delete order
      await BuyOrders.deleteOne({ orderId }).session(session);
    } else {
      //update order
      await BuyOrders.updateOne(
        { orderId },
        {
          $set: {
            stockAmount: parseInt(Order.stockAmount) - parseInt(stockAmount),
          },
        },
        { session }
      );
    }

    //create closed trade

    const sellLimit = await closedTrades.create(
      {
        orderId,
        sellerId: userId,
        buyerId,
        stockName,
        stockAmount,
        price,
      },
      { session }
    );
    await session.commitTransaction();

    return res.json({
      status: 200,
      payload: sellLimit,
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

module.exports = Sell;

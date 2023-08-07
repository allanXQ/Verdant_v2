const Messages = require("../../../utils/messages");
const closedTrades = require("../../../models/p2p/closedTrades");
const Users = require("../../../models/user");
const SellOrders = require("../../../models/p2p/SellOrders");

//check if buy order exists
//check if buyer has sufficient balance
//update seller balance
//update buyer balance
//remove order from SellOrders
//create a complete trade

const Buy = async (req, res) => {
  const { userId, sellerId, orderId, stockName, stockAmount, price } = req.body;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    //check order existence
    const Order = await SellOrders.findOne({ orderId });
    if (!Order) {
      return res.status(400).json({ message: Messages.invalidRequest });
    }

    //check && update seller portfolio
    const findseller = await Users.findOne({ userId: sellerId }).session(
      session
    );
    if (!findseller) {
      return res.status(400).json({ message: Messages.invalidRequest });
    }
    const sellerPortfolio = findseller.portfolio;
    const sellerStock = sellerPortfolio.find(
      (stock) => stock.stockName === stockName
    );

    if (!sellerStock) {
      await Users.updateOne(
        { userId: sellerId },
        {
          $push: {
            portfolio: {
              ownerId: sellerId,
              stockName,
              stockAmount,
            },
          },
        },
        { session }
      );
    } else {
      sellerStock.amountOwned =
        parseInt(sellerStock.amountOwned) + parseInt(stockAmount);
      await findseller.save({ session });
    }

    //update/delete buy order from buy orders
    if (parseInt(Order.stockAmount) <= 0) {
      //delete order
      await SellOrders.deleteOne({ orderId }).session(session);
    } else {
      //update order
      await SellOrders.updateOne(
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
        sellerId,
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

module.exports = Buy;

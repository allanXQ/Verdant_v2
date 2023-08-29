const { default: mongoose } = require("mongoose");
const Messages = require("../../../utils/messages");
const closedTrades = require("../../../models/p2p/closedTrades");
const Users = require("../../../models/users");
const BuyOrders = require("../../../models/p2p/buyOrders");
const Escrow = require("../../../models/p2p/escrow");

//check if buy order exists
//check if buyer has sufficient account balance in escrow
//check if seller has sufficient portfolio balance
//update seller account balance +
//update/delete buyer escrow account -
//update buyer portfolio balance +
//remove//update order from buyorders
//create a complete trade

const sellLimit = async (req, res) => {
  const { userId, buyerId, orderId, stockName, stockAmount, price } = req.body;
  if (userId === buyerId) {
    return res.status(400).json({ message: Messages.invalidRequest });
  }
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    //check order existence
    const Order = await BuyOrders.findOne({ orderId });
    if (!Order) {
      return res.status(400).json({ message: Messages.invalidRequest });
    }
    //check if buyer has sufficient account balance in escrow
    const buyerEscrow = await Escrow.findOne({ orderId, userId: buyerId });
    const assetValue = parseInt(stockAmount) * parseInt(price);
    if (!buyerEscrow || parseInt(buyerEscrow.cashAmount) < assetValue) {
      return res.json({
        status: 400,
        message: Messages.invalidRequest,
      });
    }
    //update escrow
    const buyerCashAmount = parseInt(buyerEscrow.cashAmount);
    const newEscrowBalance = buyerCashAmount - assetValue;
    if (newEscrowBalance < 0) {
      return res.json({
        status: 400,
        message: Messages.invalidRequest,
      });
    }
    if (newEscrowBalance === 0) {
      await Escrow.deleteOne({ orderId, userId: buyerId }).session(session);
    } else {
      await Escrow.updateOne(
        { orderId, userId: buyerId },
        {
          $set: {
            cashAmount: newEscrowBalance,
          },
        },
        { session }
      );
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
    stock.amountOwned = parseInt(stock.amountOwned) - parseInt(stockAmount);
    await user.save({ session });

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
              amountOwned: stockAmount,
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
    const newOrderBalance = parseInt(Order.stockAmount) - parseInt(stockAmount);
    if (newOrderBalance < 0) {
      return res.json({
        status: 400,
        message: Messages.invalidRequest,
      });
    }
    if (newOrderBalance === 0) {
      //delete order
      await BuyOrders.deleteOne({ orderId }).session(session);
    } else {
      //update order
      await BuyOrders.updateOne(
        { orderId },
        {
          $set: {
            stockAmount: newOrderBalance,
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
    session && (await session.abortTransaction());
    console.log(error);
    return res.json({ status: 500, message: Messages.serverError });
  } finally {
    session && session.endSession();
  }
};

module.exports = sellLimit;

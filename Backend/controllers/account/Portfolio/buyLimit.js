const Messages = require("../../../utils/messages");
const closedTrades = require("../../../models/p2p/closedTrades");
const Users = require("../../../models/Users");
const sellOrders = require("../../../models/p2p/SellOrders");
const Escrow = require("../../../models/p2p/escrow");

//check if sell order exists
//check if buyer has sufficient account balance
//check if seller escrow account exists with this orderid and has sufficient asset balance
//update buyer account balance -
//update seller account balance +
//update/delete seller escrow account -
//update buyer portfolio balance +
//remove/update order from sellOrders
//create a complete trade

const Buy = async (req, res) => {
  const { userId, sellerId, orderId, stockName, stockAmount, price } = req.body;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    //check order existence
    const Order = await sellOrders.findOne({ orderId });
    if (!Order) {
      return res.status(400).json({ message: Messages.invalidRequest });
    }
    if (parseInt(Order.stockAmount) < parseInt(stockAmount)) {
      return res.status(400).json({ message: Messages.overRequest });
    }

    //check if buyer has sufficient account balance
    const buyer = await Users.findOne({ userId }).session(session);
    const buyerAccountBalance = parseInt(buyer.accountBalance);
    const assetValue = parseInt(stockAmount) * parseInt(price);
    if (buyerAccountBalance < assetValue) {
      return res.status(400).json({ message: Messages.insufficientBalance });
    }
    //check if seller escrow account exists with this orderid and has sufficient asset balance
    const sellerEscrow = await Escrow.findOne({ orderId, userId: sellerId });
    if (
      !sellerEscrow ||
      parseInt(sellerEscrow.stockAmount) < parseInt(stockAmount)
    ) {
      return res.status(400).json({ message: Messages.invalidRequest });
    }
    //update buyer account balance -
    buyer.accountBalance = buyerAccountBalance - assetValue;
    await buyer.save({ session });

    //update seller account balance +
    const seller = await Users.findOne({ userId: sellerId }).session(session);
    if (!seller) {
      return res.status(400).json({ message: Messages.invalidRequest });
    }
    const sellerAccountBalance = parseInt(seller.accountBalance);
    seller.accountBalance = sellerAccountBalance + assetValue;
    await seller.save({ session });

    //update/delete seller escrow account -
    const sellerStockAmount = parseInt(sellerEscrow.stockAmount);
    const newSellerEscrowBalance = sellerStockAmount - parseInt(stockAmount);
    if (newSellerEscrowBalance < 0) {
      return res.json({
        status: 400,
        message: Messages.invalidRequest,
      });
    }
    if (newSellerEscrowBalance === 0) {
      await Escrow.deleteOne({ orderId, userId: sellerId }).session(session);
    } else {
      await Escrow.updateOne(
        { orderId, userId: sellerId },
        {
          $set: {
            stockAmount: newSellerEscrowBalance,
          },
        },
        { session }
      );
    }

    //update/delete order from sell orders

    if (parseInt(Order.stockAmount) - parseInt(stockAmount) === 0) {
      //delete order
      await sellOrders.deleteOne({ orderId }).session(session);
    } else {
      //update order
      await sellOrders.updateOne(
        { orderId },
        {
          $set: {
            stockAmount: newSellerEscrowBalance,
          },
        },
        { session }
      );
    }

    //create closed trade

    const sellLimit = await closedTrades.create(
      {
        orderId,
        buyerId: userId,
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

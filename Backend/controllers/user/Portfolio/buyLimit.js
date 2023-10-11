const { default: mongoose } = require("mongoose");
const Messages = require("@utils/messages");
const { User, limitOrders, limitEscrow } = require("@models");
const axios = require("axios");
const { coinLabelMap } = require("@config");

//check if buyer has sufficient account balance
//check if sell order exists
//if !exists create limit buy order, update buyer account balance, create escrow account

//check if seller escrow account exists with this orderid and has sufficient asset balance
//update buyer account balance -
//update seller account balance +
//update/delete seller escrow account -
//update buyer portfolio balance +
//remove/update order from sellOrders
//create a complete trade
const fetchTickerData = async (assetName) => {
  const tradingPair = coinLabelMap[assetName];
  if (!tradingPair) {
    throw new Error(Messages.invalidAsset);
  }
  const url = `https://api.binance.com/api/v3/ticker/24hr?symbol=${tradingPair}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    let lastPrice = parseFloat(data.lastPrice).toFixed(2);
    return parseInt(lastPrice);
  } catch (err) {
    throw new Error(err.message);
  }
};

const buyLimit = async (req, res) => {
  const { userId, sellerId, assetName, amount } = req.body;
  const price = await fetchTickerData(assetName);
  if (userId === sellerId) {
    return res.status(400).json({ message: Messages.invalidRequest });
  }
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    //find buyer and order
    const Buyer = await User.findOne({ userId }).session(session);
    const Order = await limitOrders
      .findOne({ assetName, price })
      .session(session);

    const buyerBalance = parseInt(Buyer.balance);
    const assetAmount = parseInt(amount);
    const totalCost = assetAmount * price;
    if (buyerBalance < totalCost) {
      return res.status(400).json({ message: Messages.insufficientBalance });
    }
    if (Order) {
      const sellerId = Order.userId;
      const orderId = Order.orderId;
      const Seller = await User.findOne({ userId: sellerId }).session(session);
      const orderEscrow = await limitEscrow
        .findOne({ orderId })
        .session(session);
      const sellerBalance = parseInt(Seller.balance);
      const escrowAmount = parseInt(orderEscrow.amount);
      Buyer.balance = buyerBalance - totalCost;
      Seller.balance = sellerBalance + totalCost;
      const newEscrowAmount = escrowAmount - assetAmount;
      orderEscrow.amount = newEscrowAmount;
      if (newEscrowAmount <= 0) {
        await limitEscrow.deleteOne({ orderId }).session(session);
      }
      const buyerPortfolio = Buyer.portfolio;
      buyerPortfolio.find((asset) => {
        if (asset.assetName === assetName) {
          asset.amount = parseInt(asset.amount) + assetAmount;
        }
      });
      await Buyer.save();
      await Seller.save();
      await orderEscrow.save();
      await session.commitTransaction();
      session.endSession();
      return res.status(200).json({ message: Messages.orderCompleted });
    }
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: err.message });
  }
};

module.exports = buyLimit;

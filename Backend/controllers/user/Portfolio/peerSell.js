const mongoose = require("mongoose");

const limitOrder = require("../../../models/limit/limitOrders");
const peerOrders = require("../../../models/p2p/peerOrders");
const peerEscrow = require("../../../models/p2p/peerEscrow");
const limitEscrow = require("../../../models/limit/limitEscrow");
const closedPeer = require("../../../models/p2p/closedPeer");
const closedLimit = require("../../../models/limit/closedLimit");
const User = require("../../../models/users");
const Messages = require("../../../utils/messages");
const { coinLabelMap } = require("../../../config/Assetinfo");
const logger = require("../../../utils/logger");
const createId = require("../../../utils/createId");

const peerSell = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, assetName, amount, price } = req.body;
    const Seller = await User.findOne({ userId });
    const portfolio = Seller.portfolio;
    const currentAsset = portfolio.find((item) => item.assetName === assetName);
    //update portfolio
    if (!currentAsset) {
      return res.status(400).json({ message: "Asset not found" });
    }

    const assetAmount = parseInt(currentAsset.amount);
    const intAmount = parseInt(amount);
    const intPrice = parseInt(price);
    const assetValue = intAmount * intPrice;
    const newAmount = assetAmount - intAmount;
    if (assetAmount < intAmount) {
      return res
        .status(400)
        .json({ message: "Insufficient portfolio Balance" });
    }
    currentAsset.amount = newAmount;
    await Seller.save({ session });
    //check if there is a matching buy order
    const buyOrder = await peerOrders.findOne({
      assetName,
      price,
      amount,
      orderType: "buyp2p",
    });
    if (!buyOrder) {
      await peerOrders.create(
        [
          {
            userId,
            assetName,
            amount,
            price,
            orderType: "sellp2p",
            totalAssetValue: assetValue,
          },
        ],
        { session }
      );
      await peerEscrow.create([
        {
          orderId: createId(),
          orderType: "sellp2p",
          userId,
          assetName,
          amount,
          cashAmount: 0,
        },
      ]);
      await session.commitTransaction();
      session.endSession();
      return res.status(200).json({ message: "Order Placed" });
    }
    if (buyOrder.userId === userId) {
      return res.status(400).json({ message: "You cannot buy from yourself" });
    }

    const buyerEscrow = await peerEscrow
      .findOne({
        orderId: buyOrder.orderId,
      })
      .session(session);
    if (!buyerEscrow) {
      return res.status(400).json({ message: "Buyer not found" });
    }
    if (parseInt(buyerEscrow.cashAmount) < assetValue) {
      return res.status(400).json({ message: "Buyer has insufficient funds" });
    }
    Seller.accountBalance =
      parseInt(Seller.accountBalance) + parseInt(buyerEscrow.cashAmount);
    await Seller.save({ session });
    const buyer = await User.findOne({ userId: buyOrder.userId }).session(
      session
    );
    const buyerportfolio = buyer.portfolio;
    const buyerAsset = buyerportfolio.find(
      (item) => item.assetName === assetName
    );
    if (buyerAsset) {
      buyerAsset.amount += intAmount;
      await buyer.save({ session });
    } else {
      buyerportfolio.push({
        ownerId: userId,
        assetName,
        amount: assetAmount,
      });
    }

    await peerOrders.deleteOne({ orderId: buyOrder.orderId });
    await peerEscrow.deleteOne({ orderId: buyOrder.orderId });

    await closedPeer.create(
      [
        {
          orderId: buyOrder.orderId,
          sellerId: userId,
          buyerId: buyOrder.userId,
          assetName,
          amount,
          price,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({ message: "Order Completed" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    logger.error(error);
    throw new Error(error);
  }
};

module.exports = { peerSell };

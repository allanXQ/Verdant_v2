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

const peerSell = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, orderType, asset, amount, price } = req.body;
    const Seller = await User.findOne({ userId });
    const portfolio = Seller.portfolio;
    const currentAsset = portfolio.find((asset) => asset.assetName === asset);
    //update portfolio
    if (currentAsset) {
      currentAsset.amount -= amount;
      await Seller.save({ session });
    }

    const intAmount = parseInt(currentAsset.amount);
    const intPrice = parseInt(price);
    const assetValue = intAmount * intPrice;
    if (intAmount < amount) {
      return res
        .status(400)
        .json({ message: "Insufficient portfolio Balance" });
    }
    const buyOrder = await peerOrders.findOne({
      assetName: asset,
      price,
      amount,
      orderType: "buyp2p",
    });
    if (!buyOrder) {
      await peerOrders.create(
        [
          {
            userId,
            assetName: asset,
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
          stockName: asset,
          stockAmount: amount,
        },
      ]);
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

    Seller.balance =
      parseInt(Seller.balance) + parseInt(buyerEscrow.cashAmount);
    await Seller.save({ session });
    const Sellerportfolio = Seller.portfolio;
    const SellerAsset = Sellerportfolio.find(
      (asset) => asset.assetName === asset
    );
    const buyer = await User.findOne({ userId: buyOrder.userId }).session(
      session
    );
    const buyerportfolio = buyer.portfolio;
    const buyerAsset = buyerportfolio.find(
      (asset) => asset.assetName === asset
    );
    if (buyerAsset) {
      buyerAsset.amount += intAmount;
      await buyer.save({ session });
    } else {
      buyerportfolio.push({ assetName: asset, amount: intAmount });
    }

    await peerOrders.deleteOne({ orderId: buyOrder.orderId });
    await peerEscrow.deleteOne({ orderId: buyOrder.orderId });

    await closedPeer.create(
      [
        {
          orderId: buyOrder.orderId,
          SellerId: userId,
          sellerId: buyOrder.userId,
          assetName: asset,
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

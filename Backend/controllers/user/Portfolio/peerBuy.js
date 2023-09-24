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

//buyer is not seller
//buyer has enough balance to buy
//seller has enough portfolio balance to sell
//escrow has enough balance

const fetchPrice = async (assetName) => {
  const tradingPair = coinLabelMap[assetName]?.toLowerCase();
  const url = `https://api.binance.com/api/v3/ticker/24hr?symbol=${tradingPair}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return parseFloat(data.lastPrice, 10);
  } catch (err) {
    return err.message;
  }
};

const peerBuy = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, orderType, asset, amount, price } = req.body;
    switch (orderType) {
      case "buyp2p":
        const Buyer = await User.findOne({ userId }).session(session);
        const balance = parseInt(Buyer.balance);
        const intAmount = parseInt(amount);
        const intPrice = parseInt(price);
        const assetValue = intAmount * intPrice;
        if (balance < assetValue) {
          return res.status(400).json({ message: "Insufficient Balance" });
        }
        const sale = await peerOrders
          .findOne({
            assetName: asset,
            price,
            amount,
            orderType: "sellp2p",
          })
          .session(session);
        if (!sale) {
          const orderId = createId();
          await peerOrders.create(
            [
              {
                orderId,
                userId,
                assetName: asset,
                amount,
                price,
                orderType: "buyp2p",
                totalAssetValue: assetValue,
              },
            ],
            { session }
          );
          await peerEscrow.create(
            [
              {
                orderId,
                userId,
                orderType: "buyp2p",
                cashAmount: assetValue,
              },
            ],
            { session }
          );
          return res.status(200).json({ message: "Order Placed" });
        }
        if (sale.userId === userId) {
          return res
            .status(400)
            .json({ message: "You cannot buy from yourself" });
        }
        Buyer.balance = balance - assetValue;
        const buyerportfolio = Buyer.portfolio;
        const buyerAsset = buyerportfolio.find(
          (asset) => asset.assetName === asset
        );
        if (buyerAsset) {
          buyerAsset.amount += intAmount;
          await Buyer.save({ session });
        } else {
          buyerportfolio.push({ assetName: asset, amount: intAmount });
        }
        Buyer.portfolio = buyerportfolio;
        await Buyer.save({ session });

        const Seller = await User.findOne({ userId: sale.userId }).session(
          session
        );
        Seller.balance = parseInt(Seller.balance) + assetValue;
        await Seller.save({ session });

        await peerOrders.deleteOne({ orderId: sale.orderId }).session(session);
        await peerEscrow.deleteOne({ orderId: sale.orderId }).session(session);

        await closedPeer.create(
          [
            {
              orderId: sale.orderId,
              buyerId: userId,
              sellerId: sale.userId,
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
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    logger.error(error);
    throw new Error(error);
  }
};

module.exports = { peerBuy };

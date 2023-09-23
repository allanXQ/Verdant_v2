const mongoose = require("mongoose");

const BuyOrder = require("../../../models/limit/limitOrders");
const SellOrder = require("../../../models/limit/sellOrders");
const Messages = require("../../../utils/messages");
const { coinLabelMap } = require("../../app/Assetinfo/config/index");
const logger = require("../../../utils/logger");

async function handleOrder(orderType, orderData) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userName, assetName, amount } = orderData;
    //fetch the current price of the asset frrom binance api
    const tradingPair = coinLabelMap[assetName]?.toLowerCase();
    const url = `wss://stream.binance.com:9443/ws/${tradingPair}@ticker`;
    let price;
    const ws = new WebSocket(url);
    ws.on("message", (data) => {
      price = parseFloat(data.c);
      ws.close();
    });
    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      logger.error(error);
      return res.status(500).json({ message: Messages.serverError });
    });

    // ... (the various validations you have already implemented)

    const oppositeOrderModel = orderType === "sell" ? BuyOrder : SellOrder;
    const matchingOrder = await oppositeOrderModel.findOne({
      assetName,
      price,
    });

    if (matchingOrder) {
      // Fulfill the order logic, including creating a FulfilledOrder record,
      // updating the buyer's and seller's portfolio, and potentially removing
      // or updating the matched order, all within the transaction.

      // ... (fulfill order logic)

      await session.commitTransaction();
      session.endSession();
      return { status: "fulfilled", order: matchingOrder };
    } else {
      // If no match, create a new order for the user
      //if sell check if user has enough portfolio balance to place the order
      //if buy check if user has enough balance to place the order. update escrow balance

      const orderModel = orderType === "sell" ? SellOrder : BuyOrder;
      const newOrder = new orderModel(orderData);
      await newOrder.save({ session });

      await session.commitTransaction();
      session.endSession();
      return { status: "pending", order: newOrder };
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error; // Re-throw the error after aborting the transaction
  }
}

module.exports = { handleOrder };

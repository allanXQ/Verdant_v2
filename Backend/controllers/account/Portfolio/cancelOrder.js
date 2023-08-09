const { orderTypes } = require("../../../config");
const buyOrders = require("../../../models/p2p/BuyOrders");
const sellOrders = require("../../../models/p2p/SellOrders");

const cancelOrder = async (req, res) => {
  try {
    const { userId, orderId, orderType } = req.body;
    switch (orderType) {
      case orderTypes.Buy:
        await buyOrders.deleteOne({ orderId, buyerId: userId });
        break;
      case orderTypes.Sell:
        await sellOrders.deleteOne({ orderId, sellerId: userId });
        break;
      default:
        return res.status(400).json({ message: Messages.invalidRequest });
    }
    return res.status(200).json({ message: Messages.requestSuccessful });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: Messages.serverError });
  }
};

module.exports = cancelOrder;

const { orderTypes } = require("../../../config");
const Orders = require("../../../models/p2p/peerOrders");

const cancelOrder = async (req, res) => {
  const { userId, orderId, orderType } = req.body;
  await Orders.deleteOne({ orderId });
  return res.status(200).json({ message: Messages.requestSuccessful });
};

module.exports = cancelOrder;

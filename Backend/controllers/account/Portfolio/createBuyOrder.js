const buyOrders = require("../../../models/p2p/buyOrders");
const Messages = require("../../../utils/messages");

const createbuyOrder = async (req, res) => {
  const { userId, username, stockName, stockAmount, price } = req.body;

  try {
    const buyOrder = await buyOrders.create({
      orderId,
      buyerId: userId,
      buyerName: username,
      stockName,
      stockAmount,
      price,
    });
    return res.json({
      status: 200,
      payload: buyOrder,
      message: Messages.orderCreated,
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: Messages.serverError });
  }
};

module.exports = createbuyOrder;

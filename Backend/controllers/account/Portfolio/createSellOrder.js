const SellOrders = require("../../../models/p2p/SellOrders");
const Messages = require("../../../utils/messages");

const createSellOrder = async (req, res) => {
  const { userId, username, stockName, stockAmount, price } = req.body;

  try {
    const sellOrder = await SellOrders.create({
      orderId,
      sellerId: userId,
      sellerName: username,
      stockName,
      stockAmount,
      price,
    });
    return res.json({
      status: 200,
      payload: sellOrder,
      message: Messages.orderCreated,
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: Messages.serverError });
  }
};

module.exports = createSellOrder;

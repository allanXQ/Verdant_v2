const closedTrades = require("../../../models/p2p/closedTrades");
const Messages = require("../../../utils/messages");

//implement filter by stockname and userid,transaction status,
// sorting by price,date,
//pagination
const getTrades = async (req, res) => {
  const { userId, stockName, type } = req.body;
  let trades;
  try {
    switch (type) {
      case "buy":
        trades = await buyOrders.find({ userId, stockName });
        break;
      case "sell":
        trades = await sellOrders.find({ userId, stockName });
        break;
      case "closed":
        trades = await closedTrades.find({ userId, stockName });
        break;
      default:
        const buys = await buyOrders.find({ userId, stockName });
        const sells = await sellOrders.find({ userId, stockName });
        const closed = await closedTrades.find({ userId, stockName });
        trades = [...buys, ...sells, ...closed];
        break;
    }
    return res.json({
      status: 200,
      payload: trades,
      message: Messages.orderCreated,
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: Messages.serverError });
  }
};

module.exports = getTrades;

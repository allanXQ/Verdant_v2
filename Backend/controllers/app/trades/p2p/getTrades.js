const buyOrders = require("../../../../models/p2p/buyOrders");
const sellOrders = require("../../../../models/p2p/sellOrders");
const Messages = require("../../../../utils/messages");

const getP2PTrades = async (req, res) => {
  const buys = await buyOrders.find().lean();
  const sells = await sellOrders.find().lean();

  const trades = [
    ...buys.map((buy) => ({
      ...buy,
      type: "buy",
    })),
    ...sells.map((sell) => ({
      ...sell,
      type: "sell",
    })),
  ];

  res.status(200).json({
    message: Messages.requestSuccessful,
    payload: trades,
  });
};

module.exports = getP2PTrades;

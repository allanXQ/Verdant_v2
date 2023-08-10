const Stocks = require("../../../models/Stocks");
const createId = require("../../../utils/createId");
const Messages = require("../../../utils/messages");

//check if stock exists
//check if coin pair exists in binance
//create a stock
const addStock = async (req, res, next) => {
  try {
    const { stockName, coinPair, amount } = req.body;
    const stockId = createId;
    await Stocks.create({
      stockId,
      stockName,
      coinPair,
      amount,
    });
    return res.status(200).json({
      message: Messages.requestSuccessful,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addStock;

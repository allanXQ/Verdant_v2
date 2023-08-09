const Stocks = require("../../../models/stocks");

const getStocks = async (req, res) => {
  try {
    const stocks = await Stocks.find();
    if (stocks) {
      return res.json({
        status: 200,
        message: "stocks retrieved",
        payload: stocks,
      });
    }
  } catch (error) {
    return res.json({ status: 500, message: "An error occurred" });
  }
};

module.exports = getStocks;

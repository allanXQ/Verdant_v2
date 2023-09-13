const sellOrders = require("./models/p2p/sellOrders");
const buyOrders = require("./models/p2p/buyOrders");

const buys = [
  {
    orderId: "b1",
    buyerId: "u1",
    buyerName: "user1",
    stockName: "BTC",
    stockAmount: 0.0001,
    totalAssetValue: 100,
    created: "2021-08-01T00:00:00.000Z",
  },
  {
    orderId: "b2",
    buyerId: "u2",
    buyerName: "user2",
    stockName: "BTC",
    stockAmount: 0.0001,
    totalAssetValue: 100,
    created: "2021-08-01T00:00:00.000Z",
  },
  {
    orderId: "b3",
    buyerId: "u3",
    buyerName: "user3",
    stockName: "BTC",
    stockAmount: 0.0001,
    totalAssetValue: 100,
    created: "2021-08-01T00:00:00.000Z",
  },
];

const sells = [
  {
    orderId: "s1",
    sellerId: "u4",
    sellerName: "user4",
    stockName: "BTC",
    stockAmount: 0.0001,
    price: 100,
    created: "2021-08-01T00:00:00.000Z",
  },
  {
    orderId: "s2",
    sellerId: "u5",
    sellerName: "user5",
    stockName: "BTC",
    stockAmount: 0.0001,
    price: 100,

    created: "2021-08-01T00:00:00.000Z",
  },
  {
    orderId: "s3",
    sellerId: "u6",
    sellerName: "user6",
    stockName: "BTC",
    stockAmount: 0.0001,
    price: 100,
    created: "2021-08-01T00:00:00.000Z",
  },
];

const createTrades = async () => {
  await buyOrders.insertMany(buys);
  await sellOrders.insertMany(sells);
};

createTrades();

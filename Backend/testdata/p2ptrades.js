const { peerOrders } = require("@models");
const { peerEscrow } = require("@models");

userId;
("f35108397b93");

userId;
("539cda572db0");

const buys = [
  {
    orderId: "b1",
    userId: "539cda572db0",
    assetName: "verdant",
    orderType: "buyp2p",
    amount: 10,
    price: 100,
    totalAssetValue: 100,
    created: "2021-08-01T00:00:00.000Z",
  },
];

const sells = [
  {
    orderId: "s1",
    userId: "f35108397b93",
    assetName: "verdant",
    orderType: "sellp2p",
    amount: 10,
    price: 100,
    created: "2021-08-01T00:00:00.000Z",
  },
];

const peerEscrow = [
  {
    orderId: "s1",
    orderType: "sellp2p",
    userId: "f35108397b93",
    assetName: "verdant",
    amount: 10,
  },
];

const createTrades = async () => {
  await peerOrders.insertMany(sells);
  await peerEscrow.insertMany(peerEscrow);
};

createTrades();

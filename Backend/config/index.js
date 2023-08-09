const roles = {
  admin: "a048f5",
  user: "03e4ab",
};

const withdrawalModes = {
  Stripe: "Stripe",
  Mpesa: "Mpesa",
};

const withdrawalStatus = {
  Pending: "Pending",
  Approved: "Approved",
  Rejected: "Rejected",
};

const orderTypes = {
  Buy: "Buy",
  Sell: "Sell",
  buyLimit: "buyLimit",
  sellLimit: "sellLimit",
};

const orderStatus = {
  Pending: "Pending",
  Fulfilled: "Fulfilled",
  Cancelled: "Cancelled",
};

module.exports = {
  roles,
  withdrawalModes,
  withdrawalStatus,
  orderTypes,
  orderStatus,
};

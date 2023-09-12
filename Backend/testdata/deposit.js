const depositModel = require("../models/deposit");

const deposits = [
  {
    mpesaRef: "LH12345678",
    phone: 254748517525,
    amount: 1500,
    created: "2021-05-01T00:00:00.000Z",
  },
  {
    mpesaRef: "LH12345679",
    phone: 254748517525,
    amount: 1000,
    created: "2021-05-02T00:00:00.000Z",
  },
  {
    mpesaRef: "LH12345680",
    phone: 254748517525,
    amount: 2000,
    created: "2021-05-03T00:00:00.000Z",
  },
  {
    mpesaRef: "LH12345681",
    phone: 254748517525,
    amount: 3000,
    created: "2021-05-04T00:00:00.000Z",
  },
  {
    mpesaRef: "LH12345682",
    phone: 254748517525,
    amount: 4000,
    created: "2021-05-05T00:00:00.000Z",
  },
  {
    mpesaRef: "LH12345683",
    phone: 254748517525,
    amount: 5000,
    created: "2021-05-06T00:00:00.000Z",
  },
  {
    mpesaRef: "LH12345684",
    phone: 254748517525,
    amount: 6000,
    created: "2021-05-07T00:00:00.000Z",
  },
  {
    mpesaRef: "LH12345685",
    phone: 254748517525,
    amount: 7000,
    created: "2021-05-08T00:00:00.000Z",
  },
  {
    mpesaRef: "LH12345686",
    phone: 254748517525,
    amount: 8000,
    created: "2021-05-09T00:00:00.000Z",
  },
  {
    mpesaRef: "LH12345687",
    phone: 254748517525,
    amount: 9000,
    created: "2021-05-10T00:00:00.000Z",
  },
  {
    mpesaRef: "LH12345688",
    phone: 254748517525,
    amount: 10000,
    created: "2021-05-11T00:00:00.000Z",
  },
];
const totalDeposits = deposits.reduce((acc, curr) => acc + curr.amount, 0);

console.log(totalDeposits);

const deposit = async (deposits) => {
  try {
    await depositModel.insertMany(deposits);
  } catch (error) {
    console.log(error);
  }
};

deposit(deposits);

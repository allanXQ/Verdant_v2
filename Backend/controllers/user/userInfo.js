const User = require("../../models/users");
const Messages = require("../../utils/messages");

const userInfo = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  const userData = await User.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $lookup: {
        from: "mpesadeposits",
        localField: "userId",
        foreignField: "userId",
        as: "mpesaDeposits",
      },
    },
    {
      $lookup: {
        from: "withdrawals",
        localField: "userId",
        foreignField: "userId",
        as: "withdrawals",
      },
    },
    {
      $project: {
        password: 0,
        // any other fields you want to exclude...
      },
    },
  ]);

  return res.status(200).json({
    message: Messages.requestSuccessful,
    payload: userData,
  });
};

module.exports = userInfo;

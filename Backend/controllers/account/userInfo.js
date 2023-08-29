const User = require("../../models/users");
const Messages = require("../../utils/messages");

const userInfo = async (req, res) => {
  try {
    const { userid } = req.body;
    const userData = await User.aggregate([
      {
        $lookup: {
          from: "mpesaDeposits",
          localField: "userid",
          foreignField: "userid",
          as: "mpesaDeposits",
        },
      },
      {
        $lookup: {
          from: "withdrawals",
          localField: "userid",
          foreignField: "userid",
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

    console.log(userData);
    return res.status(200).json({
      message: Messages.requestSuccessful,
      payload: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: Messages.serverError,
      payload: null,
    });
  }
};

module.exports = userInfo;

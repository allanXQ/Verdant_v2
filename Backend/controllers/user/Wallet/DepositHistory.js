const MpesaDeposits = require("../../../models/mpesaDeposits");
const Messages = require("../../../utils/messages");

const MpesaDepositHistory = async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ message: Messages.invalidRequest });
  }

  const depositHistory = await MpesaDeposits.find({ phone });
  return res
    .status(200)
    .json({ message: Messages.requestSuccessful, payload: depositHistory });
};

module.exports = { MpesaDepositHistory };

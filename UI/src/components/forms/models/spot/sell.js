import CreateForm from "../../utils/createForm";

const SellModel = {
  name: "Sell",
  endpoint: "user/trade/spot/sell-limit",
  method: "post",
  variant: "outlined",

  fields: [
    {
      name: "asset",
      type: "text",
      label: "Asset",
      placeholder: "asset name",
      required: true,
    },
    {
      name: "amount",
      type: "number",
      label: "Amount",
      placeholder: "min 100",
      required: true,
    },
  ],
};

const SellForm = ({ children }) => {
  return CreateForm("Sell", SellModel, children);
};

export default SellForm;

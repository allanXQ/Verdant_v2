import CreateForm from "../../utils/createForm";

const BuyModel = {
  name: "Buy",
  endpoint: "user/trade/spot/buy-limit",
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

const BuyForm = ({ children }) => {
  return CreateForm("Buy", BuyModel, children);
};

export default BuyForm;

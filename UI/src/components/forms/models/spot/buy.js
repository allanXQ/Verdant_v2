import CreateForm from "../../utils/createForm";

const BuyModel = {
  name: "Buy",
  endpoint: "user/trade/spot/buy-limit",
  method: "post",

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
    {
      name: "price",
      type: "number",
      label: "Price",
      placeholder: "Price per unit",
      required: true,
    },
  ],
};

const BuyForm = () => {
  return CreateForm("Buy", BuyModel);
};

export default BuyForm;

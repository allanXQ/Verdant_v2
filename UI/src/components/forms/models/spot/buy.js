import { useSelector } from "react-redux";
import CreateForm from "../../utils/createForm";
import { selectActiveAsset } from "redux/features/app/appDataSlice";

const BuyModel = {
  name: "Buy",
  endpoint: "user/trade/spot/buy-limit",
  method: "post",
  variant: "outlined",
  sx: {
    width: "15rem",
  },

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
  const activeAsset = useSelector(selectActiveAsset);
  const updatedBuyModel = {
    ...BuyModel,
    fields: BuyModel.fields.map((field) =>
      field.name === "asset" ? { ...field, defaultValue: activeAsset } : field
    ),
  };
  return CreateForm("Buy", updatedBuyModel, children, activeAsset);
};

export default BuyForm;

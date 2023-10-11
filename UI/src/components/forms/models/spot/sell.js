import { useSelector } from "react-redux";
import CreateForm from "../../utils/createForm";
import { selectActiveAsset } from "redux/features/app/appDataSlice";

const SellModel = {
  name: "Sell",
  endpoint: "user/trade/spot/sell-limit",
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

const SellForm = ({ children }) => {
  const activeAsset = useSelector(selectActiveAsset);
  const updatedSellModel = {
    ...SellModel,
    fields: SellModel.fields.map((field) =>
      field.name === "asset" ? { ...field, defaultValue: activeAsset } : field
    ),
  };

  return CreateForm("Sell", updatedSellModel, children, activeAsset);
};

export default SellForm;

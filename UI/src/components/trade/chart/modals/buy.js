import { Card, CardContent, Modal, TextField } from "@mui/material";
import BuyForm from "components/forms/models/spot/buy";
import React, { useEffect } from "react";
import createWebSocket from "../utils/websocket";
import MUITextField from "components/forms/inputs/textField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Buy = ({ state, dispatch }) => {
  //   useEffect(() => {
  //     if (state.buy) {
  //       const socket = createWebSocket();
  //       socket.on("connect", () => {
  //         socket.emit("requestPrice", {
  //           assetName,
  //         });

  //         socket.on("priceData", (data) => {
  //           console.log(data);
  //         });
  //       });
  //     }
  //   });
  return (
    state.buy && (
      <Modal
        open={state.buy}
        onClose={() => dispatch({ type: "close" })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <CardContent>
            <BuyForm>
              <TextField
                label="Price"
                autoComplete="off"
                sx={{
                  width: "25rem",
                  "& .Mui-focused": {
                    backgroundColor: "transparent",
                  },
                  "& .MuiInputBase-input": {
                    "&:focus": {
                      backgroundColor: "transparent",
                    },
                  },
                }}
              />
            </BuyForm>
          </CardContent>
        </Card>
      </Modal>
    )
  );
};

export default Buy;

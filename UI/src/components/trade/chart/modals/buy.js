import { Box, Card, CardContent, Modal, Typography } from "@mui/material";
import BuyForm from "components/forms/models/spot/buy";
import React from "react";

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
            <BuyForm />
          </CardContent>
        </Card>
      </Modal>
    )
  );
};

export default Buy;

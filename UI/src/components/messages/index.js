import { useEffect, useState } from "react";
import { clearError, selectError } from "redux/features/app/error";

const { Modal, Box, Typography, Snackbar, Alert } = require("@mui/material");
const { useSelector, useDispatch } = require("react-redux");
// const {
//   selectMessageModal,
//   updateMessageModal,
// } = require("redux/features/app/configSlice");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const MessageModal = ({ type, message }) => {
  //   const messageModalState = useSelector(selectMessageModal);
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (error?.message) {
      console.log(error.type);
      setIsOpen(true);
    }
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
    setTimeout(() => {
      dispatch(clearError());
    }, 1000);
  };
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={error?.type}
        sx={{ width: "100%" }}
      >
        {error?.message}
      </Alert>
    </Snackbar>
  );
};

export default MessageModal;

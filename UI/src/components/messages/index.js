const { Modal, Box, Typography } = require("@mui/material");
const { useSelector } = require("react-redux");
const {
  selectMessageModal,
  updateMessageModal,
} = require("redux/features/app/configSlice");

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

const messageModal = ({ type, message }) => {
  const messageModalState = useSelector(selectMessageModal);
  const dispatch = useDispatch();
  return (
    messageModalState?.isOpen && (
      <Modal
        open={messageModalState.isOpen}
        onClose={() => {
          dispatch(
            updateMessageModal({ isOpen: false, type: "", message: "" })
          );
        }}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {type}
          </Typography>
          <Typography variant="body2" component="p">
            {message}
          </Typography>
        </Box>
      </Modal>
    )
  );
};

export default messageModal;

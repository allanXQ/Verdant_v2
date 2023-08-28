import { MoreVertOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Popover, Typography } from "@mui/material";
import { useState } from "react";

const klineIntervals = [
  {
    value: "1s",
    label: "1s",
  },
  {
    value: "1m",
    label: "1m",
  },
  {
    value: "3m",
    label: "3m",
  },
  {
    value: "5m",
    label: "5m",
    default: true,
  },
  {
    value: "15m",
    label: "15m",
  },
  {
    value: "30m",
    label: "30m",
  },
  {
    value: "1h",
    label: "1h",
    default: true,
    main: true,
  },
  {
    value: "2h",
    label: "2h",
  },
  {
    value: "4h",
    label: "4h",
  },
  {
    value: "6h",
    label: "6h",
  },
  {
    value: "8h",
    label: "8h",
  },
  {
    value: "12h",
    label: "12h",
  },
  {
    value: "1d",
    label: "1d",
    default: true,
  },
  {
    value: "3d",
    label: "3d",
  },
  {
    value: "1w",
    label: "1w",
  },
  {
    value: "1M",
    label: "1M",
  },
];

const RangePicker = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        p: "1rem",
        backgroundColor: "#253248",
      }}
    >
      {klineIntervals.map(
        (interval) =>
          interval.default && (
            <Button
              variant="outlined"
              sx={{
                width: "0.5rem",
                borderRadius: "0",
              }}
            >
              {interval.label}
            </Button>
          )
      )}
      <IconButton onClick={handleClick}>
        <MoreVertOutlined color="primary" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </Box>
  );
};

export default RangePicker;

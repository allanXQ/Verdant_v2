import { KeyboardArrowDown, MoreVertOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Popover,
  Select,
  Typography,
} from "@mui/material";
import { MuiButton } from "components/common/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateKlineInterval } from "redux/features/app/appDataSlice";

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

const assets = [
  "verdant",
  "azureCorp",
  "sapphireHoldings",
  "crimsonEnterprise",
  "goldenVentures",
  "silverSolutions",
  "emeraldInc",
  "rubyLtd",
  "topazGroup",
  "amberAssociation",
  "pearlCo",
];

const RangePicker = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

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
        alignItems: "center",
        justifyContent: "space-between",
        width: {
          xs: "100vw",
          sm: `calc(100vw - 230px)`,
        },
        height: "3.5rem",
        backgroundColor: "#253248",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: 300,
        }}
      >
        {klineIntervals.map(
          (interval) =>
            interval.default && (
              <MuiButton
                key={interval.label}
                variant="outlined"
                sx={{
                  width: "0.5rem",
                  borderRadius: "0",
                }}
                content={interval.label}
                onClick={() => dispatch(updateKlineInterval(interval.value))}
              />
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
      <Box>
        <Select
          value={assets[0]}
          // onChange={handleAssetChange}
          variant="outlined"
          sx={{
            bgcolor: "transparent",
            width: 200,
            color: "red",
            // "& .MuiSelect-select": {
            //   backgroundColor: "transparent",
            // },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          {assets.map((asset) => (
            <MenuItem
              key={asset}
              value={asset}
              sx={{
                bgcolor: "transparent",
                "& .MuiList-root": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Typography variant="bodyRegular">{asset}</Typography>
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <MuiButton
          variant="contained"
          sx={{
            width: "0.5rem",
            borderRadius: "0",
          }}
          onClick={() => dispatch({ type: "buy" })}
          content="Buy"
        />

        <MuiButton
          variant="contained"
          sx={{
            width: "0.5rem",
            borderRadius: "0",
          }}
          onClick={() => dispatch({ type: "sell" })}
          content="Sell"
        />
      </Box>
    </Box>
  );
};

export default RangePicker;

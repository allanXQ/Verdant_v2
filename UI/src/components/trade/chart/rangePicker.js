import { KeyboardArrowDown, MoreVertOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { MuiButton } from "components/common/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateActiveAsset,
  updateKlineInterval,
} from "redux/features/app/appDataSlice";
import { selectTheme } from "redux/features/app/configSlice";

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
  const currentTheme = useSelector(selectTheme);
  const theme = useTheme();
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAssetChange = (event) => {
    setSelectedAsset(event.target.value);
    dispatch(updateActiveAsset(event.target.value));
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Grid
      container
      alignContent={"center"}
      justifyContent="space-between"
      sx={{
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "space-between",
        width: {
          xs: "100vw",
          sm: `calc(100vw - 230px)`,
        },
        //   height: "3.5rem",
        //   backgroundColor: "#253248",
      }}
    >
      <Grid
        item
        sx={{
          bgcolor: "red",
        }}
      >
        <Select
          value={selectedAsset}
          onChange={handleAssetChange}
          variant="outlined"
          sx={{
            // width: 200,
            color: "red",

            // "& .MuiOutlinedInput-notchedOutline": {
            //   border: "none",
            // },
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
              <Typography variant="bodyLarge">{asset}</Typography>
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {klineIntervals.map(
          (interval) =>
            interval.default && (
              <MuiButton
                key={interval.label}
                variant="outlined"
                sx={{
                  display: {
                    xs: "none",
                    sm: "flex",
                  },
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
            horizontal: "right",
          }}
          sx={{
            position: "absolute",
            "& .MuiPopover-paper": {
              backgroundColor:
                currentTheme === "light"
                  ? theme.palette.bgColor.light
                  : theme.palette.bgColor.dark,
              color: "white",
              boxShadow: "none",
              // "& .MuiList-root": {
              //   backgroundColor: "transparent",
              //   "& .MuiListItem-root": {
              //     backgroundColor: "transparent",
              //     "&:hover": {
              //       backgroundColor: "transparent",
              //     },
              //   },
              // },
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              // justifyContent: "space-evenly",
              alignItems: "center",
              width: 290,
              p: 2,
              m: 0,
              // height: 200,
            }}
          >
            {klineIntervals.map((interval) => (
              <MuiButton
                key={interval.label}
                variant="outlined"
                sx={{
                  display: {
                    xs: "none",
                    sm: "flex",
                  },
                  width: "0.5rem",
                  borderRadius: "0",
                }}
                content={interval.label}
                onClick={() => dispatch(updateKlineInterval(interval.value))}
              />
            ))}
          </Box>
        </Popover>
      </Grid>

      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
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
      </Grid>
    </Grid>
  );
};

export default RangePicker;

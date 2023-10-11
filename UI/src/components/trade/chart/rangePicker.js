import { KeyboardArrowDown, MoreVertOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { MuiButton } from "components/common/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveAsset,
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

  const selectedAsset = useSelector(selectActiveAsset);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAssetChange = (event) => {
    dispatch(updateActiveAsset(event.target.value));
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const statsStyle = {
    width: 300,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: {
            xs: "100vw",
            sm: `calc(100vw - 230px)`,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Select
            value={selectedAsset}
            onChange={handleAssetChange}
            variant="outlined"
            sx={{
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
                <Typography variant="bodyLarge">{asset}</Typography>
              </MenuItem>
            ))}
          </Select>
          <Typography variant="bodySmall">1000</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            // alignItems: "center",
            // justifyContent: "space-between",
          }}
        >
          <Box sx={statsStyle}>
            <Stack>
              <Typography variant="bodySmall">24h High</Typography>
              <Typography variant="bodySmall">1200</Typography>
            </Stack>
            <Stack>
              <Typography variant="bodySmall">24h Change</Typography>
              <Typography variant="bodySmall">10</Typography>
            </Stack>
          </Box>
          <Box sx={statsStyle}>
            <Stack>
              <Typography variant="bodySmall">24h Low</Typography>
              <Typography variant="bodySmall">800</Typography>
            </Stack>

            <Stack>
              <Typography variant="bodySmall">24h Volume</Typography>
              <Typography variant="bodySmall">1000</Typography>
            </Stack>
          </Box>
        </Box>

        {/* <Grid item>
          
        </Grid> */}
      </Box>
    </>
    // <Grid
    //   container
    //   alignContent={"center"}
    //   justifyContent="space-between"
    //   sx={{
    //     width: {
    //       xs: "100vw",
    //       sm: `calc(100vw - 230px)`,
    //     },
    //   }}
    // >
    //   <Grid
    //     item
    //     sx={{
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "space-evenly",
    //     }}
    //   >
    //     {klineIntervals.map(
    //       (interval) =>
    //         interval.default && (
    //           <MuiButton
    //             key={interval.label}
    //             variant="outlined"
    //             sx={{
    //               display: {
    //                 xs: "none",
    //                 sm: "flex",
    //               },
    //               width: "0.5rem",
    //               borderRadius: "0",
    //             }}
    //             content={interval.label}
    //             onClick={() => dispatch(updateKlineInterval(interval.value))}
    //           />
    //         )
    //     )}
    //     <IconButton onClick={handleClick}>
    //       <MoreVertOutlined color="primary" />
    //     </IconButton>
    //     <Popover
    //       id={id}
    //       open={open}
    //       anchorEl={anchorEl}
    //       onClose={handleClose}
    //       anchorOrigin={{
    //         vertical: "bottom",
    //         horizontal: "right",
    //       }}
    //       sx={{
    //         position: "absolute",
    //         "& .MuiPopover-paper": {
    //           backgroundColor:
    //             currentTheme === "light"
    //               ? theme.palette.bgColor.light
    //               : theme.palette.bgColor.dark,
    //           color: "white",
    //           boxShadow: "none",
    //         },
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexWrap: "wrap",
    //           alignItems: "center",
    //           width: 290,
    //           p: 2,
    //           m: 0,
    //         }}
    //       >
    //         {klineIntervals.map((interval) => (
    //           <MuiButton
    //             key={interval.label}
    //             variant="outlined"
    //             sx={{
    //               display: {
    //                 xs: "none",
    //                 sm: "flex",
    //               },
    //               width: "0.5rem",
    //               borderRadius: "0",
    //             }}
    //             content={interval.label}
    //             onClick={() => dispatch(updateKlineInterval(interval.value))}
    //           />
    //         ))}
    //       </Box>
    //     </Popover>
    //   </Grid>

    //   <Grid
    //     item
    //     sx={{
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "space-evenly",
    //       gap: "1rem",
    //     }}
    //   >
    //     <MuiButton
    //       variant="contained"
    //       sx={{
    //         width: "0.5rem",
    //         borderRadius: "0",
    //       }}
    //       onClick={() => dispatch({ type: "buy" })}
    //       content="Buy"
    //     />

    //     <MuiButton
    //       variant="contained"
    //       sx={{
    //         width: "0.5rem",
    //         borderRadius: "0",
    //       }}
    //       onClick={() => dispatch({ type: "sell" })}
    //       content="Sell"
    //     />
    //   </Grid>
    // </Grid>
  );
};

export default RangePicker;

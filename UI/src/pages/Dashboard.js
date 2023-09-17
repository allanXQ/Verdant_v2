//account balance
//loans taken
//loans given
//credit score

//active loan requests
import {
  CreditCardOutlined,
  Groups2Outlined,
  Groups3Outlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
  SwapHorizOutlined,
  TransferWithinAStationOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import MUIDataGrid from "components/common/Datagrid";
import React from "react";
import { useNavigate } from "react-router-dom";

const ActionButton = ({ asset }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      onClick={() => navigate(`/trade/spot/${asset}`)}
    >
      Trade
    </Button>
  );
};

const stats = [
  {
    name: "Balance",
    value: "100",
    percentageChange: 10,
  },
  {
    name: "Portfolio",
    value: "1000",
    percentageChange: 10,
  },
  {
    name: "Trades",
    value: "1000",
    percentageChange: 10,
  },
  {
    name: "Total Profit",
    value: "750",
    percentageChange: -10,
  },
];

const columns = [
  {
    field: "Asset",
    headerName: "Asset",
    smallScreenScreen: true,
    width: 200,
  },
  {
    field: "Symbol",
    headerName: "Symbol",
    smallScreenScreen: false,
    width: 200,
  },
  {
    field: "Amount",
    headerName: "Amount",
    smallScreenScreen: false,
    width: 200,
  },
  {
    field: "percentageChange",
    headerName: "24h Change",
    smallScreenScreen: true,
    width: 200,
  },
  {
    field: "Price",
    headerName: "Price",
    smallScreenScreen: true,
    width: 200,
  },
  {
    field: "action",
    headerName: "Action",
    smallScreenScreen: false,
    width: 100,
    renderCell: (params) => {
      return <ActionButton asset={params.row.Asset} />;
    },
  },
];

const Assets = [
  {
    id: 1,
    iconurl: "https://www.coingecko.com/coins/1/large/bitcoin.png?1547033579",
    Asset: "Bitcoin",
    Symbol: "BTC",
    Amount: "0.0000001",
    Price: "1000000",
    percentageChange: 10,
  },
  {
    id: 2,
    iconurl:
      "https://www.coingecko.com/coins/356/large/ethereum.png?1547034048",
    Asset: "Ethereum",
    Symbol: "ETH",
    Amount: "0.0000001",
    Price: "1000000",
    percentageChange: 10,
  },
  {
    id: 3,
    iconurl:
      "https://www.coingecko.com/coins/825/large/binance-coin-logo.png?1547034615",
    Asset: "Litecoin",
    Symbol: "LTC",
    Amount: "0.0000001",
    Price: "1000000",
    percentageChange: 10,
  },
  {
    id: 4,
    iconurl:
      "https://www.coingecko.com/coins/12171/large/polkadot-new-logo.png?1616489452",
    Asset: "Bitcoin Cash",
    Symbol: "BCH",
    Amount: "0.0000001",
    Price: "1000000",
    percentageChange: 10,
  },
  {
    id: 5,
    iconurl:
      "https://www.coingecko.com/coins/12171/large/polkadot-new-logo.png?1616489452",
    Asset: "Ripple",
    Symbol: "XRP",
    Amount: "0.0000001",
    Price: "1000000",
    percentageChange: 10,
  },
  {
    id: 6,
    iconurl:
      "https://www.coingecko.com/coins/12171/large/polkadot-new-logo.png?1616489452",
    Asset: "Dogecoin",
    Symbol: "DOGE",
    Amount: "0.0000001",
    Price: "1000000",
    percentageChange: 10,
  },
  {
    id: 7,
    iconurl:
      "https://www.coingecko.com/coins/12171/large/polkadot-new-logo.png?1616489452",
    Asset: "Cardano",
    Symbol: "ADA",
    Amount: "0.0000001",
    Price: "1000000",
    percentageChange: 10,
  },
  {
    id: 8,
    iconurl:
      "https://www.coingecko.com/coins/12171/large/polkadot-new-logo.png?1616489452",
    Asset: "Polkadot",
    Symbol: "DOT",
    Amount: "0.0000001",
    Price: "1000000",
    percentageChange: 10,
  },
];

const overviewWidth = `calc(100vw - 200px)`;

const Dashboard = React.memo(() => {
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    width: { sm: "100vw", lg: `calc(${overviewWidth} - 2rem)` },
    backgroundColor: "blue.secondary",
    border: "none",
    boxShadow: "none",
  };
  return (
    <Grid
      container
      spacing="0.5rem"
      sx={{
        display: "flex",
        flexDirection: { sm: "column", lg: "row" },
        width: overviewWidth,
        height: "100vh",
        gap: 1,
        flexGrow: 1,
        flexBasis: 0,
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        pt: "50px",
      }}
    >
      <Grid item>
        <Card sx={cardStyle}>
          <CardContent
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexGrow: 1,
              justifyContent: "space-between",
              gap: 1,
              maxHeight: "60px",
            }}
          >
            <Typography variant="h5" color="white.primary">
              Account Overview
            </Typography>
            <CardActionArea
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                maxWidth: { sm: "250px" },
                pl: 2,
                gap: 2,
                flexGrow: 1,
              }}
            >
              <Button variant="contained" color="primary">
                Withdraw
              </Button>
              <Button variant="contained" color="primary">
                Deposit
              </Button>
            </CardActionArea>
          </CardContent>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: { xs: 2, sm: 4 },
              flexWrap: "wrap",
              flexGrow: 1,
              flexFlow: "row wrap",
              // maxHeight: "70px",
            }}
          >
            {stats.map((stat, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    width: "150px",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "white.primary",
                    }}
                  >
                    {stat.name}
                  </Typography>
                  <Box>
                    {stat.percentageChange > 0 ? (
                      <Typography
                        variant="caption"
                        color="green.primary"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.1rem",
                        }}
                      >
                        <KeyboardArrowUpOutlined
                          sx={{
                            fontSize: "1rem",
                          }}
                        />
                        +{stat.percentageChange}%
                      </Typography>
                    ) : (
                      <Typography
                        variant="caption"
                        color="red.primary"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.1rem",
                        }}
                      >
                        <KeyboardArrowDownOutlined
                          sx={{
                            fontSize: "1rem",
                          }}
                        />
                        -{stat.percentageChange}%
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="white.primary"
                >
                  KSH {stat.value}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={cardStyle}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                maxHeight: "20px",
              }}
            >
              <Typography color="white.primary">Assets</Typography>
              <Button
                variant="text"
                color="primary"
                sx={{
                  fontWeight: "bold",
                }}
              >
                See All
              </Button>
            </Box>
            <MUIDataGrid
              columns={columns}
              rows={Assets.slice(0, 6)}
              pagination={false}
              height={450}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
});

export default Dashboard;

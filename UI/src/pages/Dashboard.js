import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
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
    smallScreenScreen: false,
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
    width: {
      xs: "100vw",
      sm: `calc(${overviewWidth})`,
    },
    border: "none",
    boxShadow: "none",
    backgroundColor: "bgColor.dark",
  };
  return (
    <Grid
      container
      spacing="0.5rem"
      sx={{
        display: "flex",
        flexDirection: { sm: "column", lg: "row" },
        gap: 1,
        flexGrow: 1,
        flexBasis: 0,
        flexWrap: "wrap",
        overflowX: "hidden",
      }}
    >
      <Grid item sx={{}}>
        <Card sx={{ ...cardStyle, gap: { sm: 2 } }}>
          <CardContent
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              flexGrow: 1,
              justifyContent: { xs: "center", sm: "space-between" },
              gap: 1,
              maxHeight: { lg: "60px" },
            }}
          >
            <Typography variant="bodyLarge">Account Overview</Typography>
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
                  <Typography variant="bodyRegular">{stat.name}</Typography>
                  <Box>
                    {stat.percentageChange > 0 ? (
                      <Typography
                        variant="bodySmall"
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
                        variant="bodySmall"
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
                <Typography variant="h6" fontWeight="bold">
                  KSH {stat.value}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        sx={{
          height: "100%",
        }}
      >
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
              <Typography variant="bodyLarge">Assets</Typography>
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
              height={370}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
});

export default Dashboard;

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
    width: 200,
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

const Services = [
  {
    id: 1,
    name: "P2P",
    icon: <Groups2Outlined />,
    Description: "Peer to Peer Trading",
  },
  {
    id: 2,
    name: "Referral",
    icon: <Groups3Outlined />,
    Description: "Refer and Earn",
  },
  {
    id: 3,
    name: "Transfer",
    icon: <TransferWithinAStationOutlined />,
    Description: "Transfer assets to other users",
  },
  {
    id: 4,
    name: "Loan",
    icon: <CreditCardOutlined />,
    Description: "Get a loan",
  },
  {
    id: 5,
    name: "Swap",
    icon: <SwapHorizOutlined />,
    Description: "Swap your assets",
  },
];

const secondaryCardWidth = "350px";
const overviewWidth = `calc(100vw - 200px - ${secondaryCardWidth} - 2rem)`;

const Dashboard = React.memo(() => {
  return (
    <Grid
      container
      spacing="0.5rem"
      sx={{
        display: "flex",
        flexDirection: { sm: "column", lg: "row" },
        width: "fit-content",
        gap: 1,
        flexGrow: 1,
        flexBasis: 0,
        flexWrap: "wrap",
      }}
    >
      <Grid item>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { sm: "100vw", lg: overviewWidth },
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexGrow: 1,
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography variant="h5">Account Overview</Typography>
            <CardActionArea
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                maxWidth: { sm: "250px" },
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
                  <Typography variant="body2">{stat.name}</Typography>
                  <Box>
                    {stat.percentageChange > 0 ? (
                      <Typography
                        variant="caption"
                        color="green"
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
                        color="red"
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

          <CardContent
            sx={{
              maxHeight: "400px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Assets</Typography>
              <Button variant="contained" color="primary">
                See All
              </Button>
            </Box>
            <Box
              sx={{
                maxWidth: "90vw",
              }}
            >
              <MUIDataGrid
                columns={columns}
                rows={Assets.slice(0, 5)}
                pagination={false}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          width: secondaryCardWidth,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" sx={{}}>
            More Services
          </Typography>
        </Box>

        {Services.map((service, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              height: "80px",
              minWidth: secondaryCardWidth,
              border: "1px solid rgba(0,0,0,0.1)",
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <CardContent sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {service.icon}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">{service.name}</Typography>
                <Typography variant="body2">{service.Description}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
});

export default Dashboard;

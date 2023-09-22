import { Box, Grid, Typography, Button } from "@mui/material";

const whyUs = [
  {
    title: "Seamless Trading Experience",
    description:
      "Experience a user-friendly interface, designed to facilitate a seamless trading journey from start to finish.",
  },
  {
    title: "Comprehensive Research Tools",
    description:
      "Make informed decisions with access to an array of research tools and insights that deliver a holistic view of the OTC markets.",
  },
  {
    title: "Real-time Market Data",
    description:
      "Stay ahead with real-time market data and insights, enabling you to make timely investment decisions.",
  },
  {
    title: "Secure Transactions",
    description:
      "Trade with peace of mind, knowing that your transactions are secured with state-of-the-art encryption technology.",
  },
  {
    title: "Dedicated Support",
    description:
      "Get the support you need, when you need it, with our dedicated team of customer service professionals.",
  },
];

const Features = [
  {
    title: "Live Trading Room",
    description:
      "Collaborative trading rooms for sharing insights and strategies",
  },
  {
    title: "Advanced Charting Tools",
    description: "Analytical tools for a comprehensive market analysis",
  },
  {
    title: "Portfolio Management",
    description: "Easy tracking of your investments",
  },
  {
    title: "Market Data",
    description: "Real-time market data and insights",
  },
  {
    title: "Research Tools",
    description: "Access to an array of research tools and insights",
  },
];

const Home = () => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // color: "white.primary",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            // maxWidth: "40vw",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="bodytext1">
              Welcome to Verdant Capital
            </Typography>
            <Typography variant="h6">
              The Premier Destination for OTC Stock Trading
            </Typography>
            <Typography variant="h6">
              Empowering Investors with Unparalleled Access to the OTC
              Marketplace
            </Typography>
          </Box>
          <Typography variant="body1">
            Dive deep into the lucrative world of over-the-counter (OTC) stocks
            with [Your Platform Name] — your reliable partner in navigating the
            dynamic OTC markets with ease and confidence.
          </Typography>
          <Box>
            <Button variant="contained" color="primary">
              Get Started
            </Button>
          </Box>
        </Box>
        <Box>
          <img src="/img/home3.webp" alt="hero" width={550} />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
          gap: 2,
          mt: 10,
        }}
      >
        <Box>
          <Typography variant="h5">Create your OTC portfolio today</Typography>
          <Typography variant="body1">
            Coinbase has a variety of features that make it the best place to
            start trading
          </Typography>
        </Box>
        <Box>
          {whyUs.map((item) => (
            <Box>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body1">{item.description}</Typography>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;

import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const AboutUs = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h2">Who We Are</Typography>
        <Box>
          <Typography variant="bodyRegular">
            At Verdant Capital, we're not just a trading platform — we're a
            movement. Born from a vision to simplify and revolutionize the OTC
            trading landscape, we've combined technological prowess with a
            human-centric approach. Today, we stand as a beacon for traders
            worldwide, illuminating pathways in the often tumultuous world of
            OTC markets.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2">Our Mission</Typography>
        <Box>
          <Typography variant="bodyRegular">
            We're on a mission to empower traders with the tools, insights, and
            guidance they need to navigate the OTC markets with ease and
            confidence. We're here to help you achieve your financial goals.
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h2">Our Vision</Typography>
        <Box>
          <Typography variant="bodyRegular">
            Our vision is to be the leading OTC trading platform, empowering
            traders to achieve their financial goals with confidence and ease.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2">Our Values</Typography>
        <Box>
          <Typography variant="bodyRegular">
            We believe in the power of community. We believe in the power of
            technology. We believe in the power of knowledge. We believe in the
            power of transparency. We believe in the power of collaboration.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2">Our Team</Typography>
        <Box>
          <Typography variant="bodyRegular">
            We're a team of passionate traders, developers, and customer success
            specialists. We're here to help you achieve your financial goals.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2">Our Journey</Typography>
        <Box>
          <Typography variant="bodyRegular">
            Founded in 2000 by Christian Bale, Verdant Capital began as a
            passion project. Today, with thousands of satisfied users across [X
            number of countries], our growth story resonates with innovation,
            dedication, and the trust of our community. From early morning
            market analyses to late-night coding sessions, every feature on our
            platform echoes our commitment to excellence.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2">Join Us On Our Journey</Typography>
        <Box>
          <Typography variant="bodyRegular">
            As we continue to break barriers and set new benchmarks, we invite
            you to be a part of our story. Trade, learn, and grow with Verdant
            Capital — where every trader finds a home.{" "}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AboutUs;

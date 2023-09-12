import styled from "@emotion/styled";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  maxWidth: "100vw",
  border: "none",
  "& .MuiDataGrid-withBorderColor": {
    borderColor: "transparent",
  },
  "& .MuiDataGrid-footerContainer": {
    display: "none",
  },
}));

const MUIDataGrid = ({ title, rows, columns }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Box
        sx={{
          height: 400,
        }}
      >
        <StyledDataGrid
          rows={rows}
          columns={
            isSmallScreen
              ? columns.filter((column) => {
                  column.smallScreen === true
                    ? (column.width = 120)
                    : (column.width = 1000);
                  return column.smallScreen === true;
                })
              : columns
          }
          pagination={false}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default MUIDataGrid;

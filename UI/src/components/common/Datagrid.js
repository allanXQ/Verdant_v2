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
  "& .MuiSvgIcon-root": {
    color: theme.palette.white.primary,
  },
  "& .MuiDataGrid-columnHeader": {
    color: theme.palette.white.primary,
    fontWeight: 600,
  },
  "& .MuiDataGrid-cell": {
    color: theme.palette.white.secondary,
    backgroundColor: theme.palette.blue.primary,
  },
}));

const MUIDataGrid = ({ title, rows, columns, height }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Box
        sx={{
          height: height || 390,
        }}
      >
        <StyledDataGrid
          rows={rows}
          columns={columns}
          pagination={false}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default MUIDataGrid;

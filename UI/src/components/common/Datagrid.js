import styled from "@emotion/styled";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/features/app/configSlice";

const StyledDataGrid = styled(DataGrid)(({ theme, currentTheme, width }) => ({
  width: width || "100%",
  overflowY: "hidden",
  [theme.breakpoints.down("sm")]: {
    paddingRight: "35px",
  },

  "& .MuiDataGrid-root": {},

  border: "none",
  "& .MuiDataGrid-withBorderColor": {
    borderColor: "transparent",
  },
  "& .MuiDataGrid-footerContainer": {
    display: "none",
  },
  "& .MuiSvgIcon-root": {
    color:
      currentTheme === "light"
        ? theme.palette.bgColor.dark
        : theme.palette.bgColor.light,
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    ...theme.typography.h6,
    color:
      currentTheme === "light"
        ? theme.palette.bgColor.dark
        : theme.palette.bgColor.light,
  },

  "& .MuiDataGrid-cell": {
    ...theme.typography.bodySmall,
    color:
      currentTheme === "light"
        ? theme.palette.bgColor.dark
        : theme.palette.bgColor.light,
  },
}));

const MUIDataGrid = ({ title, rows, columns, height, width }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  if (isSmallScreen) {
    columns.map((column) => {
      column.width = 120;
    });
  }
  const currentTheme = useSelector(selectTheme);

  return (
    <Box>
      <Typography variant="h4">{title}</Typography>
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
          currentTheme={currentTheme}
          width={width}
        />
      </Box>
    </Box>
  );
};

export default MUIDataGrid;

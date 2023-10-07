import styled from "@emotion/styled";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useStyledTheme from "Hooks/useStyledTheme";
import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/features/app/configSlice";

const StyledDataGrid = styled(DataGrid)(({ theme, currentTheme }) => ({
  width: "100vw",
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
    // color: theme.palette.white.primary,
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    ...theme.typography.h6, // or another variant
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

const MUIDataGrid = ({ title, rows, columns, height }) => {
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
        />
      </Box>
    </Box>
  );
};

export default MUIDataGrid;

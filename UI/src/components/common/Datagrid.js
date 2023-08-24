import styled from "@emotion/styled";
import { useMediaQuery } from "@mui/material";
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

const MUIDataGrid = ({ rows, columns }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <StyledDataGrid
      rows={rows}
      columns={
        isSmallScreen
          ? columns.filter((column) => {
              column.smallScreenScreen === true
                ? (column.width = 120)
                : (column.width = 500);
              return column.smallScreenScreen === true;
            })
          : columns
      }
      pagination={false}
      disableSelectionOnClick
    />
  );
};

export default MUIDataGrid;

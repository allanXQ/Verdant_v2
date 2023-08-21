import styled from "@emotion/styled";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const StyledDataGrid = styled(DataGrid)({
  border: "none",
  "& .MuiDataGrid-withBorderColor": {
    borderColor: "transparent",
  },
  "& .MuiDataGrid-footerContainer": {
    display: "none",
  },
});

const MUIDataGrid = ({ rows, columns }) => {
  return (
    <StyledDataGrid
      rows={rows}
      columns={columns}
      pagination={false}
      disableSelectionOnClick
    />
  );
};

export default MUIDataGrid;

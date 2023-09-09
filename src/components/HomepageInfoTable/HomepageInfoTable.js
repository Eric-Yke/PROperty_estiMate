import React from "react";
import "./HomepageInfoTable.css";
import { updatedRows } from "../../data/HomepageInfoTableData";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "post_code",
    headerName: "Postcode",
    headerClassName: "regionDataTableHeader",
    width: 150,
  },
  {
    field: "fullTimeRate",
    headerName: "Full-time Rate",
    headerClassName: "regionDataTableHeader",
    width: 350,
  },
  {
    field: "mortgagePay",
    headerName: "Mortgage Pay",
    headerClassName: "regionDataTableHeader",
    width: 350,
  },
  {
    field: "rentRate",
    headerName: "Rent Rate",
    headerClassName: "regionDataTableHeader",
    width: 350,
  },
  {
    field: "weeklyIncome",
    headerName: "Weekly Income",
    headerClassName: "regionDataTableHeader",
    width: 350,
  },
  {
    field: "weeklyRent",
    headerName: "Weekly Rent",
    headerClassName: "regionDataTableHeader",
    width: 350,
  },
  {
    field: "year_record",
    headerName: "Year Record",
    headerClassName: "regionDataTableHeader",
    width: 350,
  },
];

export default function HomepageInfoTable() {
  return (
    <Box id="regionData">
      <h1 id="tableHeading">Region Data of NSW</h1>
      <DataGrid
        rows={updatedRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

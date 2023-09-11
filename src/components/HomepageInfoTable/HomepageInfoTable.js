import React, { useEffect, useState } from "react";
import "./HomepageInfoTable.css";
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
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const params = {
      year: 2016,
      attribute_index: 13,
      order: "DESC",
    };

    fetch(
      "https://www.huanself.top/info/RegionData?" + new URLSearchParams(params)
    )
      .then((response) => response.json())
      .then((origin_rows) => {
        let id = 1;

        const rowsWithId = origin_rows.map((row) => {
          const newRow = { ...row, id: id };
          id++;
          return newRow;
        });

        setRows(rowsWithId);
      });
  }, []);

  return (
    <Box id="regionData">
      <h1 id="tableHeading">Region Data of NSW</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        disableSelectionOnClick
      />
    </Box>
  );
}

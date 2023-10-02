import React, { useEffect, useState } from "react";
import SelectYear from "../SelectYear/SelectYear";
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
    field: "rentRate",
    headerName: "Average Rent Rate",
    headerClassName: "regionDataTableHeader",
    width: 250,
  },
  {
    field: "mortgagePay",
    headerName: "Average Mortgage Pay",
    headerClassName: "regionDataTableHeader",
    width: 250,
  },
  {
    field: "weeklyIncome",
    headerName: "Average Weekly Income",
    headerClassName: "regionDataTableHeader",
    width: 250,
  },
  {
    field: "weeklyRent",
    headerName: "Average Weekly Rent",
    headerClassName: "regionDataTableHeader",
    width: 250,
  },
];

export default function HomepageInfoTable() {
  const [rows, setRows] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2016);

  useEffect(() => {
    const params = {
      year: selectedYear,
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
          const mortgagePay =
            typeof row.mortgagePay === "number"
              ? `$${row.mortgagePay.toFixed(2)}`
              : `$${parseFloat(row.mortgagePay).toFixed(2)}`;
          const weeklyIncome =
            typeof row.weeklyIncome === "number"
              ? `$${row.weeklyIncome.toFixed(2)}`
              : `$${parseFloat(row.weeklyIncome).toFixed(2)}`;
          const weeklyRent =
            typeof row.weeklyRent === "number"
              ? `$${row.weeklyRent.toFixed(2)}`
              : `$${parseFloat(row.weeklyRent).toFixed(2)}`;
          const rentRate =
            typeof row.rentRate === "number"
              ? `${(row.rentRate * 100).toFixed(2)}%`
              : `${(parseFloat(row.rentRate) * 100).toFixed(2)}%`;
          const newRow = {
            ...row,
            id: id,
            mortgagePay: mortgagePay,
            weeklyIncome: weeklyIncome,
            weeklyRent: weeklyRent,
            rentRate: rentRate,
          };
          id++;
          return newRow;
        });

        setRows(rowsWithId);
      });
  }, [selectedYear]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <Box id="regionData">
      <h1 id="tableHeading">Region Data of NSW</h1>
      <SelectYear onChange={handleYearChange} selectedYear={selectedYear} />
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}

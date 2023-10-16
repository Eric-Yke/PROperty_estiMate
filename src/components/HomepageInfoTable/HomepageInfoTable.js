import React, { useEffect, useState } from "react";
import SelectYear from "../SelectYear/SelectYear";
import "./HomepageInfoTable.css";
import Box from "@mui/material/Box";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";

const columns = [
  {
    field: "post_code",
    headerName: "Postcode",
    headerClassName: "regionDataTableHeader",
    headerAlign: "center",
    align: "center",
    width: 150,
  },
  {
    field: "rentRate",
    headerName: "Average Rent Rate",
    headerClassName: "regionDataTableHeader",
    headerAlign: "center",
    align: "center",
    width: 250,
  },
  {
    field: "mortgagePay",
    headerName: "Average Mortgage Pay",
    headerClassName: "regionDataTableHeader",
    headerAlign: "center",
    align: "center",
    width: 250,
  },
  {
    field: "weeklyIncome",
    headerName: "Average Weekly Income",
    headerClassName: "regionDataTableHeader",
    headerAlign: "center",
    align: "center",
    width: 250,
  },
  {
    field: "weeklyRent",
    headerName: "Average Weekly Rent",
    headerClassName: "regionDataTableHeader",
    headerAlign: "center",
    align: "center",
    width: 250,
  },
];

// Striped rows
const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.odd`]: {
    fontSize: "15px",
  },

  [`& .${gridClasses.row}.even`]: {
    fontSize: "15px",
    backgroundColor: theme.palette.grey[300],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

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
      <StripedDataGrid
        rows={rows}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
      />
    </Box>
  );
}

import React, { useState, useEffect } from "react";
import "./PropertyList.css";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";

const columns = [
  {
    field: "address",
    headerName: "Address",
    headerClassName: "propertyListTableHeader",
    width: 1200,
  },
  {
    field: "area",
    headerName: "Area (m\u00B2)",
    headerClassName: "propertyListTableHeader",
    width: 350,
  },
  {
    field: "transactions",
    headerName: "Number of transactions",
    headerClassName: "propertyListTableHeader",
    width: 350,
  },
  {
    field: "prediction",
    headerName: "Prediction price ($)",
    headerClassName: "propertyListTableHeader",
    width: 350,
  },
];

// Striped rows
const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.odd`]: {
    fontSize: "20px",
  },
  [`& .${gridClasses.row}.even`]: {
    fontSize: "20px",
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

export default function PropertyList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const min_price = searchParams.get("min_price");
  const max_price = searchParams.get("max_price");
  const min_area = searchParams.get("min_area");
  const max_area = searchParams.get("max_area");
  const post_code = searchParams.get("post_code");
  const min_transactions = searchParams.get("min_transactions");
  const max_transactions = searchParams.get("max_transactions");

  const [filterParams, setFilterParams] = useState({
    min_price: min_price,
    max_price: max_price,
    min_area: min_area,
    max_area: max_area,
    post_code: post_code,
    min_transactions: min_transactions,
    max_transactions: max_transactions,
  });

  const baseUrl = "https://www.huanself.top/propertyData/propertyList";

  const queryParams = new URLSearchParams();

  for (const key in filterParams) {
    if (filterParams[key] !== null) {
      queryParams.append(key, filterParams[key]);
    }
  }

  const finalUrl = `${baseUrl}?${queryParams.toString()}`;

  const [list, setList] = useState([]);

  fetch(finalUrl)
    .then((res) => res.json())
    .then((response) => {
      const new_response = response.map((item) => {
        const address = `${item.house_number} ${item.street_name} ${item.property_locality} NSW ${item.post_code}`;
        return { ...item, address };
      });

      setList(new_response);
    });

  return (
    <Box id="propertyList">
      <h1 id="tableHeading">Property List in NSW</h1>
      <StripedDataGrid
        rows={list}
        getRowId={(row) => row.property_id}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 30,
            },
          },
        }}
      />
    </Box>
  );
}

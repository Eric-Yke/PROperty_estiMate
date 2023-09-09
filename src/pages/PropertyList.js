import React, { useState, useEffect } from "react";
import "./PropertyList.css";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";

const columns = [
  {
    field: "address",
    headerName: "Address",
    headerClassName: "propertyListTableHeader",
    width: 1200,
  },
  {
    field: "area",
    headerName: "Area",
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
    headerName: "Prediction price",
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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filterParams = Object.fromEntries(searchParams.entries());

  // later
  // fetch('https://www.huanself.top/propertyData/propertyList?' + new URLSearchParams(filterParams))
  // .then(response => response.json())
  // .catch(error => {

  // });

  //  模拟数据
  const response = [
    {
      area: "663.90",
      district_code: "103",
      house_number: "11",
      nature: "R",
      post_code: "2500",
      prediction: "388702",
      property_id: "1126440",
      property_locality: "keiraville",
      street_name: "akuna street",
      transactions: 3,
      zoning: "A",
    },
    {
      area: "613.40",
      district_code: "103",
      house_number: "193",
      nature: "R",
      post_code: "2500",
      prediction: "459761",
      property_id: "1138808",
      property_locality: "wollongong",
      street_name: "church street",
      transactions: 2,
      zoning: "A",
    },
    {
      area: "658.80",
      district_code: "103",
      house_number: "17 A",
      nature: "R",
      post_code: "2500",
      prediction: "445452",
      property_id: "1151484",
      property_locality: "west wollongong",
      street_name: "gilmore street",
      transactions: 3,
      zoning: "A",
    },
    {
      area: "689.20",
      district_code: "103",
      house_number: "55",
      nature: "R",
      post_code: "2500",
      prediction: "369495",
      property_id: "1151507",
      property_locality: "west wollongong",
      street_name: "gilmore street",
      transactions: 2,
      zoning: "R2",
    },
    {
      area: "689.20",
      district_code: "103",
      house_number: "59",
      nature: "R",
      post_code: "2500",
      prediction: "369495",
      property_id: "1151509",
      property_locality: "west wollongong",
      street_name: "gilmore street",
      transactions: 2,
      zoning: "R2",
    },
    {
      area: "670.30",
      district_code: "103",
      house_number: "13",
      nature: "R",
      post_code: "2500",
      prediction: "351964",
      property_id: "1156116",
      property_locality: "west wollongong",
      street_name: "highway avenue",
      transactions: 2,
      zoning: "R2",
    },
  ];

  const new_response = response.map((item) => {
    const address = `${item.house_number} ${item.street_name} ${item.property_locality} NSW ${item.post_code}`;
    return { ...item, address };
  });

  return (
    <Box id="propertyList">
      <h1 id="tableHeading">Property List in NSW</h1>
      <StripedDataGrid
        rows={new_response}
        getRowId={(row) => row.property_id}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        columns={columns}
      />
    </Box>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import "./PropertyList.css";
import Box from "@mui/material/Box";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";

const columns = [
  {
    field: "address",
    headerName: "Address",
    headerClassName: "propertyListTableHeader",
    width: 600,
  },
  {
    field: "area",
    headerName: "Area (m\u00B2)",
    headerClassName: "propertyListTableHeader",
    headerAlign: "center",
    align: "center",
    width: 200,
  },
  {
    field: "transactions",
    headerName: "Number of transactions",
    headerClassName: "propertyListTableHeader",
    headerAlign: "center",
    align: "center",
    width: 300,
  },
  {
    field: "prediction",
    headerName: "Prediction price ($)",
    headerClassName: "propertyListTableHeader",
    headerAlign: "center",
    align: "center",
    width: 300,
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
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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

  const handleCellClick = (params) => {
    if (params.field === "address") {
      const { house_number, street_name, property_locality, post_code } =
        params.row;
      const formattedStreetName = street_name
        .toLowerCase()
        .replace(/\s+/g, "%20");
      const formattedLocality = property_locality
        .toLowerCase()
        .replace(/\s+/g, "-");
      const url = `/propertyResult/${post_code}/${formattedLocality}/${house_number}-${formattedStreetName}`;
      navigate(url);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(finalUrl);
        const data = await response.json();
        const newResponse = data.map((item) => {
          const streetName =
            item.street_name.charAt(0).toUpperCase() +
            item.street_name.slice(1);
          const propertyLocality =
            item.property_locality.charAt(0).toUpperCase() +
            item.property_locality.slice(1);
          const address = `${item.house_number} ${streetName} ${propertyLocality} NSW ${item.post_code}`;
          return { ...item, address };
        });
        setList(newResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [finalUrl]);

  return (
    <>
      <div className="page-container">
        <NavBar />
        <div className="content-wrap">
          <Box id="propertyList">
            <h1 id="tableHeading">Property List in NSW</h1>
            {loading ? (
              <h2 style={{ textAlign: "center" }}>Loading...</h2>
            ) : (
              <StripedDataGrid
                rows={list}
                getRowId={(row) => row.property_id}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                }
                columns={columns}
                onCellClick={handleCellClick}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 30,
                    },
                  },
                }}
              />
            )}
          </Box>
        </div>
        <Footer />
      </div>
    </>
  );
}

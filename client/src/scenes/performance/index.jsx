import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetUserPerformanceQuery } from "../../state/api";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";

const Performance = () => {
  // Get the current theme using useTheme hook from MUI
  const theme = useTheme();

  // Get the user ID from the global Redux store
  const userId = useSelector((state) => state.global.userId);

  // Fetch the user performance data using the custom hook from the API slice
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  // Define the columns of the data grid
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User Id",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      // Custom cell renderer to display the length of the products array
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      // Custom cell renderer to display the cost value as currency
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PERFORMANCE" subtitle="Track your Affiliate Sales here" />

      <Box
        mt="40px"
        height="75vh"
        // Styling for the data grid
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          // Display a loading indicator if the data is still being fetched
          loading={isLoading || !data}
          // Use the _id field as the unique identifier for each row
          getRowId={(row) => row._id}
          // Display the sales data if available, or an empty array otherwise
          rows={(data && data.sales) || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Performance;

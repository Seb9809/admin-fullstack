import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "../../state/api";
import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar.jsx";

const Transactions = () => {
  const theme = useTheme();

  //Values to be sent to the backend

  const [page, setPage] = useState(0); // current page
  const [pageSize, setPageSize] = useState(20); // number of items to be displayed per page
  const [sort, setSort] = useState({}); // object to specify sorting rules
  const [search, setSearch] = useState(""); // search query

  const [searchInput, setSearchInput] = useState(""); // input value for search

  // useGetTransactionsQuery is a custom hook that calls the API to fetch transaction data
  // It returns an object containing transaction data and a boolean indicating whether the data is being loaded
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  // Define the columns for the data grid
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
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
      renderCell: (params) => params.value.length, // display the number of products in the transaction
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`, // format cost to two decimal places and add dollar sign
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      {/* Render the custom header */}
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="80vh"
        sx={{
          // Styling for the data grid
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
          // A boolean flag that indicates whether the grid is currently loading
          loading={isLoading || !data}
          // A function that returns the ID of a row based on its data object
          getRowId={(row) => row._id}
          // An array of row data objects to display in the grid
          rows={(data && data.transactions) || []}
          // An array of column definitions for the grid
          columns={columns}
          // The total number of rows in the server-side data set
          rowCount={(data && data.total) || 0}
          // An array of available page size options for the grid
          rowsPerPageOptions={[20, 50, 100]}
          // A boolean flag that indicates whether to enable pagination
          pagination
          // The current page number
          page={page}
          // The number of rows per page
          pageSize={pageSize}
          // The pagination mode to use
          paginationMode="server"
          // The sorting mode to use
          sortingMode="server"
          // A callback function that is called when the page number changes
          onPageChange={(newPage) => setPage(newPage)}
          // A callback function that is called when the page size changes
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          // A callback function that is called when the sort model changes
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          // An object that maps component names to component definitions
          components={{ Toolbar: DataGridCustomToolbar }}
          // An object that contains additional props for the components
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;

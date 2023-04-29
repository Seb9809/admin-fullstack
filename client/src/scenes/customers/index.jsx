import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "../../state/api";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Customers = () => {
  // Creating a functional component called Customers
  const theme = useTheme(); // Initializing the theme variable using the useTheme hook
  const { data, isLoading } = useGetCustomersQuery(); // Initializing the data and isLoading variables using the useGetCustomersQuery hook

  // Initializing the columns array with custom cell renderers for phone numbers
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      // Custom cell renderer that formats phone numbers to (XXX)XXX-XXXX
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      {/* Render the Header component with title and subtitle props */}
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          // Styling the DataGrid component using sx prop
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
        {/* Render the DataGrid component with rows, columns and getRowId props */}
        <DataGrid
          loading={isLoading || !data} // Show a loading spinner until data is fetched
          getRowId={(row) => row._id} // Function that returns a unique ID for each row
          rows={data || []} // The array of rows to be displayed
          columns={columns} // The array of column definitions
        />
      </Box>
    </Box>
  );
};

export default Customers;

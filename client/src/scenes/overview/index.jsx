import React from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "../../components/Header";
import OverviewChart from "../../components/OverviewChart";
import { useState } from "react";

const Overview = () => {
  // Set the initial state for the view to "units"
  const [view, setView] = useState("units");

  return (
    <Box m="1.5rem 2rem">
      {/* Render the header with title and subtitle */}
      <Header
        title="Overview"
        subtitle="Overview of general revenue and profit"
      />

      {/* Create a box for the chart with a height of 75vh */}
      <Box height="75vh">
        {/* Create a form control with a dropdown to select the view */}
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            // Set the value of the dropdown to the current view state
            value={view}
            label="view"
            // Update the view state when the user selects a new value from the dropdown
            onChange={(e) => setView(e.target.value)}
          >
            {/* Render two menu items to switch between sales and units */}
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        {/* Render the chart component with the current view state */}
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};

export default Overview;

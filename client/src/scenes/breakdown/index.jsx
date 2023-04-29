import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import BreakdownChart from "../../components/BreakdownChart";

const Breakdown = () => {
  return (
    // This component returns a Box containing Header and BreakdownChart components
    <Box m="1.5rem 2.5rem    ">
      <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
      <Box mt="40px" height="75vh">
        {/* This is the BreakdownChart component which displays the breakdown of sales data */}
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Breakdown;

import { Box } from "@mui/material"; // import Box component from MUI
import { styled } from "@mui/system"; // import styled utility function from MUI system

// define a new styled Box component that uses flexbox layout with center and space-between alignment
const FlexBetween = styled(Box)({
  // use flexbox layout
  display: "flex",
  // horizontally distribute items with space between
  justifyContent: "space-between",
  // vertically center items
  alignItems: "center",
});

export default FlexBetween;

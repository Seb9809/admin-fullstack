import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

// Define a functional component called StatBox, which takes in some props
const StatBox = ({ title, value, increase, icon, description }) => {
  const theme = useTheme(); // Access the current theme object using useTheme hook from Material-UI

  // Return a Box component from Material-UI with some custom props
  return (
    <Box
      gridColumn="span 2 "
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      {/* Create a FlexBetween component, which contains a Typography and an icon */}
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      {/* Display a Typography component with some text as value */}
      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ color: theme.palette.secondary[200] }}
      >
        {value}
      </Typography>

      {/* Create another FlexBetween component with two Typography components */}
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;

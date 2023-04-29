import { Typography, Box, useTheme } from "@mui/material";

import React from "react";

// This component renders a header with a title and a subtitle.
// It receives two props: 'title' and 'subtitle'.
// It uses MUI's Box and Typography components.
const Header = ({ title, subtitle }) => {
  // It also uses the useTheme hook to get the current theme.
  const theme = useTheme();

  return (
    <Box>
      {/* The Typography components render the title and subtitle props respectively, and set their color using the current theme's palette.secondary values. */}
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;

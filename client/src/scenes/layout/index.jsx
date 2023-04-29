import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import { useGetUserQuery } from "../../state/api.js";

const Layout = () => {
  // Define state variables and get data from Redux store and API
  const isNonMobile = useMediaQuery("(min-width: 600px)"); // boolean indicating whether screen width is greater than or equal to 600px
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // boolean indicating whether sidebar is open or closed
  const userId = useSelector((state) => state.global.userId); // get userId from global state using Redux useSelector hook
  const { data } = useGetUserQuery(userId); // fetch user data from API using userId

  // Render sidebar, navbar, and outlet components within a flex container or block container depending on screen size
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {/* The Outlet component is provided by the react-router-dom library, and is used to render the child routes of the current route. */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

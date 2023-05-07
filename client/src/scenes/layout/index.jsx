import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";


const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:700px)");
  // This will return true if mediaQuery is satified, that is for desktop.

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // To check toggle the sidebar
  const userId = useSelector((state) => {
    return state.global.userID
  });
  const { data } = useGetUserQuery(userId);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user = {data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow="1">
        <Navbar
          user = {data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

/**
 * Box is an unique component where you can directly pass the width, height
 * other css properties as props, where as in other cases you'll have to
 * create an object with the properties you want to modify and then pass it
 * as a prop sx;
 *
 * <Box sx = {{display: "flex"}} > </Box>
 */

/**
 * <Outlet /> is where all the components in the nested routes will be rendered
 */

export default Layout;

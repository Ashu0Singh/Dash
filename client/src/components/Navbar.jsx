import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import ProfilePicture from "assets/Profile_Picture.jpg";
import { useTheme } from "@emotion/react";
import { AppBar, Button, IconButton, InputBase, Toolbar, setRef, Box, Typography, Menu, MenuItem } from "@mui/material";


const Navbar = ({user, isSidebarOpen , setIsSidebarOpen }) => {
  const [anchorEl,setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          gap: "0.5rem",
          justifyContent: "space-between",
        }}
      >
        {/** LEFT Side of the navigation menu */}
        <FlexBetween gap="0.5rem">
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="0.5rem"
            padding="0.1rem 1rem"
          >
            <InputBase placeholder="Search.." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/** RIGHT Side of the navigation menu */}

        <FlexBetween gap="0.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          
          <FlexBetween>
              <Button onClick={handleClick}
                sx={{
                  display:"flex",
                  justifyContent:"space-between",
                  alignItems:"center",
                  textTransform:"none",
                  gap:"1rem"
                }}
              >
                <Box 
                  component="img"
                  alt="profile"
                  src={ProfilePicture}
                  height="32px"
                  width="32px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                >
                </Box>
                <Box textAlign="left">
                    <Typography
                      fontWeight="bold"
                      fontSize="0.85rem"
                      sx={{color:theme.palette.secondary[100]}}
                    >
                      {user.name || "Shelby"}
                    </Typography>
                    <Typography
                      fontSize="0.75rem"
                      sx={{color:theme.palette.secondary[200]}}
                    >
                      {user.occupation || "Doctor"}
                    </Typography>
                </Box>
                <ArrowDropDownOutlined 
                  sx={{color:theme.palette.secondary[300], fontSize:"25px"}}
                />
              </Button>
              <Menu 
                anchorEl={anchorEl} 
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{vertical:'bottom',horizontal:'center'}}
              >
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
          </FlexBetween>

        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

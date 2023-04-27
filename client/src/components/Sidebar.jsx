import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import ProfilePicture from "assets/Profile_Picture.jpg";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";


const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined/>
  },
  {
    text: "Client Facing",
    icon: null
  },
  {
    text: "Product",
    icon: <ShoppingCartOutlined/>
  },
  {
    text: "Customers",
    icon: <Groups2Outlined/>
  },
  {
    text: "Transaction",
    icon: <ReceiptLongOutlined/>
  },
  {
    text: "Geography",
    icon: <PublicOutlined/>
  },
  {
    text: "Sales",
    icon: null
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined/>
  },
  {
    text: "Daily",
    icon: <TodayOutlined/>
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined/>
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined/>
  },
  {
    text: "Management",
    icon: null
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined/>
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined/>
  }
]

const Sidebar = ({
  user,
  drawerWidth,
  isNonMobile,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { pathname } = useLocation();
  const [ active , setActive ] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  },[pathname]);

  return (
    <Box component="nav" className="nav">
      {
        isSidebarOpen &&
        <Drawer
          open={isSidebarOpen}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              background: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : '2px',
              width: drawerWidth
            }
          }}
        >
        <FlexBetween 
          flexDirection="column"
          justifyContent="space-between"
          sx={{
            height:"100%",
            width:"100%"
          }}
        >
          <Box width="100%">
            <Box margin="1.5rem 2rem 1rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="space-between"
                    width="100%"
                >
                  <Typography variant="h4" fontWeight="bold">
                    Dashline
                  </Typography>
                  <Box>
                    {!isNonMobile && (
                      <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <ChevronLeft />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </FlexBetween>
            </Box>
            <Box>
              <List>
                {
                  navItems.map(({text,icon}) => {
                    if(!icon)
                      return (
                        <Typography key={text} sx={{margin:"2.25rem 0rem 1rem 3rem"}}>
                          {text}
                        </Typography>
                      )
                    
                    const listText = text.toLowerCase();

                    return(
                      <ListItem key={text} disablePadding>
                        <ListItemButton 
                          onClick={() => {
                            navigate(`/${listText}`);
                            setActive(listText);
                          }}

                          sx={{
                            backgroundColor: active === listText ? 
                                              theme.palette.secondary[300]:
                                              "transparent",
                            color: active === listText ? 
                                              theme.palette.primary[600]:
                                              theme.palette.secondary[100]
                          }}
                        >
                          <ListItemIcon sx={{
                            marginLeft: "2rem",
                            color: active === listText ? 
                                    theme.palette.primary[600]:
                                    theme.palette.secondary[200]
                          }} >
                            {icon}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                          {active === listText && (
                            <ChevronRightOutlined sx={{marginLeft:"auto"}} />
                          )}
                        </ListItemButton>
                      </ListItem>
                    )
                  })
                }
              </List>
            </Box>
        </Box>
        
        <Box>
          <Divider />
          <FlexBetween 
            padding="1.3rem"
            textTransform="none" 
            gap="1.4rem" 
            width="100%"
            flexDirection="row"
          >
            <Box 
              component="img"
              alt="profile"
              src={ProfilePicture}
              height="50px"
              width="50px"
              borderRadius="50%"
              sx={{ objectFit: "cover" }}
            >
            </Box>
            <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{color:theme.palette.secondary[100]}}
                >
                  {user.name || "Shelby"}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{color:theme.palette.secondary[200]}}
                >
                  {user.occupation || "Doctor"}
                </Typography>
            </Box>
            <SettingsOutlined 
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize:"25px"
                }}
            />
          </FlexBetween>
        </Box>
        </FlexBetween>
      </Drawer>
      }
    </Box>
  );
};

export default Sidebar;

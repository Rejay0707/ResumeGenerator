import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  useTheme,
  useMediaQuery,
  Tooltip,
  Box,
  ListItemIcon,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";

import { Link, Outlet, useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import useAuth from "../containers/AuthContainer";

const drawerWidth = 240;

export default function ResponsiveSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const drawer = (
    <div>
      {/* Show logo only on desktop */}
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 1,
          }}
        >
          <img src={logo1} alt="logo" style={{ width: "234px", height: 100 }} />
        </Box>
      )}
      <Toolbar />

      <List>
        {[
          { text: "Dashboard", to: "/admin/dashboard", icon: <DashboardIcon /> },
          { text: "Parents", to: "/admin/parents", icon: <PeopleIcon /> },
          { text: "Teachers", to: "/admin/teachers", icon: <SchoolIcon /> },
          { text: "Students", to: "/admin/students", icon: <GroupIcon /> },
          { text: "Recruiters", to: "/admin/recruiters", icon: <BusinessIcon /> },
        ].map(({ text, to, icon }) => (
          <ListItem
            button
            key={text}
            component={Link}
            to={to}
            onClick={() => isMobile && setMobileOpen(false)}
          >
            <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          borderLeft: { sm: "1px solid rgba(245, 248, 245, 0.82)" },
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>

          {/* Logout icon */}
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Drawer for desktop */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "5px solid rgba(29, 20, 20, 0.12)",
              backgroundColor: "black",
              color: "white",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}

      {/* Drawer for mobile */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      <main
        style={{
          flexGrow: 1,
          padding: "24px",
          paddingLeft: 0,
          paddingRight: "5px",
          paddingTop: "100px",
        }}
      >
        {/* Child route renders here */}
        <Outlet />
      </main>
    </div>
  );
}


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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet } from "react-router-dom";
import logo2 from "../assets/logo2.png.png";

const drawerWidth = 240;

export default function ResponsiveSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          mb: 1,
        }}
      >
        <img
          src={logo2}
          alt="logo"
          style={{ maxWidth: "100%", height: 64, objectFit: "contain" }}
        />
      </box>
      <Toolbar />

      <List>
        {[
          { text: "Dashboard", to: "/admin/dashboard" },
          { text: "Parents", to: "/admin/parents" },
          { text: "Teachers", to: "/admin/teachers" },
          { text: "Students", to: "/admin/students" },
          { text: "Recruiters", to: "/admin/recruiters" },
        ].map(({ text, to }) => (
          <ListItem
            button
            key={text}
            component={Link}
            to={to}
            onClick={() => isMobile && setMobileOpen(false)}
          >
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
        // sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` }, // shrink width on desktop
          ml: { sm: `${drawerWidth}px` }, // margin-left to push right of sidebar
          borderLeft: { sm: "1px solid rgba(0, 0, 0, 0.12)" }, // vertical separator line on left of AppBar
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
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
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
              borderRight: "5px solid rgba(29, 20, 20, 0.12)", // vertical separator line
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
            keepMounted: true, // Better open performance on mobile.
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
          paddingRight:"5px",
          paddingTop: "100px",
        }}
      >
        {/* This is the key: render matched child route here */}
        <Outlet />
      </main>
    </div>
  );
}

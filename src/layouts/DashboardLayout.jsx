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
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
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
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          {drawer}
        </Drawer>
      )}

      <main style={{ flexGrow: 1, padding: "80px 24px 24px 24px" }}>
        {/* This is the key: render matched child route here */}
        <Outlet />
      </main>
    </div>
  );
}
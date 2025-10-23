import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";

export default function ParentSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = [
    { label: "Home", path: "/parent/dashboard/home" },
    { label: "Children", path: "/parent/dashboard/children" },
    { label: "Performance", path: "/parent/dashboard/performance" },
    { label: "Attendance Report", path: "/parent/dashboard/attendance-report" },
    { label: "Messages", path: "/parent/dashboard/messages" },
    { label: "Profile", path: "/parent/dashboard/profile" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarContent = (
    <Box
      sx={{
        width: 220,
        bgcolor: "#4a148c",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <List>
        {items.map((item) => (
          <ListItemButton
            key={item.label}
            selected={location.pathname === item.path}
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
            sx={{ color: "white" }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ bgcolor: "white" }} />
      <List>
        <ListItemButton
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
            setMobileOpen(false);
          }}
          sx={{ color: "white" }}
        >
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      {/* Hamburger icon — hidden when sidebar is open */}
      {!mobileOpen && (
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 2000,
          }}
        >
          <IconButton onClick={handleDrawerToggle} sx={{ color: "#4a148c" }}>
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {/* Permanent sidebar for desktop */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>{sidebarContent}</Box>

      {/* Drawer for mobile/tablet */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 220,
            bgcolor: "#4a148c",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}

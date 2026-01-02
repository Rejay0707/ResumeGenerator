import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import logo1 from "../assets/logo1.png";

export default function ParentSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const items = [
    { label: "Home", path: "/parent/dashboard/home" },
    { label: "Children", path: "/parent/dashboard/children" },
    { label: "Performance", path: "/parent/dashboard/performance" },
    { label: "Attendance Report", path: "/parent/dashboard/attendance-report" },
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
        height: "100%", // 👈 fill parent height
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between", // push logout to bottom
      }}
    >
      <Box>
        {/* Show logo only on desktop */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <img src={logo1} alt="logo" style={{ width: "100%", maxWidth: "215px", height: "auto" }} />
          </Box>
        )}
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
      </Box>

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
      {/* Hamburger icon for mobile */}
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

      {/* Fixed sidebar on desktop */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "sticky", // 👈 sticks to top
          top: 0,
          height: "100vh", // fills full screen height and grows naturally with parent
          overflowY: "auto",
        }}
      >
        {sidebarContent}
      </Box>

      {/* Drawer for mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
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

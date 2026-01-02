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

export default function TeacherSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const items = [
    { label: "Home", path: "/teacher/dashboard/home" },
    { label: "Attendance", path: "/teacher/dashboard/attendance" },
    { label: "Classes", path: "/teacher/dashboard/classes" },
    { label: "Subjects", path: "/teacher/dashboard/subjects" },
    { label: "Students", path: "/teacher/dashboard/students" },
    { label: "Profile", path: "/teacher/dashboard/profile" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarContent = (
    <Box
      sx={{
        width: 220,
        bgcolor: "#0d47a1",
        color: "white",
        minHeight: "100vh",
      }}
    >
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
          <IconButton onClick={handleDrawerToggle} sx={{ color: "#0d47a1" }}>
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
            bgcolor: "#0d47a1",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}
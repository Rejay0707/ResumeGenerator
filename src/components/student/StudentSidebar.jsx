import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PsychologyIcon from "@mui/icons-material/Psychology";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import logo1 from "../../assets/logo1.png";

export default function StudentSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const items = [
    {
      label: "Dashboard",
      path: "/student/dashboard",
      icon: <DashboardIcon fontSize="small" />,
    },
    {
      label: "Personal Details",
      path: "/student/dashboard/personalDetails",
      icon: <PersonIcon fontSize="small" />,
    },
    {
      label: "Education",
      path: "/student/dashboard/education",
      icon: <SchoolIcon fontSize="small" />,
    },
    {
      label: "Internships",
      path: "/student/dashboard/internships",
      icon: <WorkOutlineIcon fontSize="small" />,
    },
    {
      label: "Projects",
      path: "/student/dashboard/projects",
      icon: <AssignmentIcon fontSize="small" />,
    },
    {
      label: "Certificates",
      path: "/student/dashboard/certificates",
      icon: <WorkspacePremiumIcon fontSize="small" />,
    },
    {
      label: "Skills",
      path: "/student/dashboard/skills",
      icon: <PsychologyIcon fontSize="small" />,
    },
    {
      label: "Notifications",
      path: "/student/dashboard/notifications",
      icon: <NotificationsIcon fontSize="small" />,
    },
    {
      label: "Resume",
      path: "/student/dashboard/resume",
      icon: <DescriptionIcon fontSize="small" />,
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarContent = (
    <Box
      sx={{
        width: 220,
        bgcolor: "#122d47",
        color: "white",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        {/* LOGO — desktop only */}
        {!isMobile && (
          <Box sx={{ mb: 2 }}>
            <img
              src={logo1}
              alt="logo"
              style={{
                width: "100%",
                maxWidth: "215px",
                height: "auto",
              }}
            />
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
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1}>
                    {item.icon}
                    {item.label}
                  </Box>
                }
              />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ bgcolor: "white" }} />
      </Box>

      {/* Logout */}
      <List sx={{ mt: "auto" }}>
        <ListItemButton
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
            setMobileOpen(false);
          }}
          sx={{ color: "white" }}
        >
          <ListItemText
            primary={
              <Box display="flex" alignItems="center" gap={1}>
                <LogoutIcon fontSize="small" />
                Logout
              </Box>
            }
          />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      {/* Hamburger — mobile only */}
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
          <IconButton onClick={handleDrawerToggle} sx={{ color: "#1976d2" }}>
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {/* Desktop sidebar */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          flexShrink: 0, // ✅ CRITICAL
          width: 220, // ✅ Explicit width
        }}
      >
        {sidebarContent}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 220,
            bgcolor: "#1976d2",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}

import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { Link } from "react-router-dom";
import { Person, Close, Book, Add } from "@mui/icons-material";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  ListItemButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { TrendingUp, Logout } from "@mui/icons-material";

const DRAWER_WIDTH = 320;

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const menuItems = [
    { text: "My library", icon: <Book />, action: () => {} },
    { text: "Reading Stats", icon: <TrendingUp />, action: () => {} },
    { text: "Add a book", icon: <Add />, action: () => {} },
    { text: "Logout", icon: <Logout />, action: () => {} },
  ];

  const drawerContent = (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
    >
      {/* Close button for mobile */}
      {isMobile && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={handleDrawerClose}>
            <Close />
          </IconButton>
        </Box>
      )}

      {/* User Profile Section */}
      <Box
        sx={{
          p: 3,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            width: 64,
            height: 64,
            mx: "auto",
            mb: 2,
            backgroundColor: "primary.light",
          }}
        >
          <Person sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="h6" gutterBottom>
          email address
        </Typography>
      </Box>

      <Divider />

      {/* Menu Items */}
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                item.action();
                handleDrawerClose();
              }}
              sx={{
                py: 1.5,
                px: 3,
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <ListItemIcon sx={{ color: "text.secondary" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        component="header"
        sx={{
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.default",
        }}
      >
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <IconButton
              size="large"
              edge="start"
              sx={{
                mr: 2,
                display: "flex",
                alignItems: "center",
                color: "text.primary",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <LocalLibraryIcon />
              <Typography
                variant="h6"
                component="div"
                sx={{ ml: 1.5, flexGrow: 1 }}
                color="text.primary"
              >
                BookTracker
              </Typography>
            </IconButton>
          </Link>

          <div style={{ flexGrow: 1 }} />

          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              color: "text.primary",
              transform: drawerOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            {drawerOpen ? <Close /> : <Person />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Overlay Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        variant="temporary"
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            backgroundColor: "background.paper",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Header;

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { Link } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { Drawer, Box, List, ListItem, ListItemText } from "@mui/material";
import React, { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";

function Header() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
          <IconButton onClick={handleDrawerOpen}>
            <Person />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        variant="temporary"
      >
        {/* drawer header */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <List></List>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;

import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { LocalLibrary, DarkMode, LightMode, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext.tsx";

interface HeaderProps {
  onDrawerOpen: () => void;
}

function Header({ onDrawerOpen }: HeaderProps) {
  const { mode, toggleTheme } = useTheme();

  return (
    <>
      <AppBar
        position="static"
        component="header"
        color="transparent"
        sx={{
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.default",
        }}
      >
        <Toolbar>
          <Button
            startIcon={<LocalLibrary />}
            color="inherit"
            component={Link}
            to="/"
            sx={{ textTransform: "none" }}
          >
            <Typography sx={{ flexGrow: 1 }} color="text.main" fontSize={20}>
              BookTracker
            </Typography>
          </Button>

          <div style={{ flexGrow: 1 }} />
          <IconButton
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            sx={{ color: "inherit", mr: 3 }}
          >
            {mode === "light" ? <LightMode /> : <DarkMode />}
          </IconButton>
          <IconButton
            onClick={onDrawerOpen}
            sx={{
              color: "inherit",
            }}
          >
            <Person />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;

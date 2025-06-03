import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { Link } from "react-router-dom";
import { DarkMode, LightMode, Person } from "@mui/icons-material";
import { useTheme } from "../../context/themeContext.tsx";

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
                color: "text.main",
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
                color="text.main"
              >
                BookTracker
              </Typography>
            </IconButton>
          </Link>

          <div style={{ flexGrow: 1 }} />
          {/* Optionally, add a floating button to toggle theme */}
          <IconButton
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            sx={{ color: "text.main", mr: 3 }}
          >
            {mode === "light" ? <LightMode /> : <DarkMode />}
          </IconButton>
          <IconButton
            onClick={onDrawerOpen}
            sx={{
              color: "text.main",
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

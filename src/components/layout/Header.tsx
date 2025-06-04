import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { Link } from "react-router-dom";
import { DarkMode, LightMode, Person } from "@mui/icons-material";
import { useTheme } from "../../context/ThemeContext.tsx";
import { Button } from "@mui/material";

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
            startIcon={<LocalLibraryIcon />}
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

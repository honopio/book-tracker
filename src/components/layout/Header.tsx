import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { Link } from "react-router-dom";

function Header() {
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
          <Button>Login</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;

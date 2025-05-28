import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

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
          <IconButton
            size="large"
            edge="start"
            sx={{
              mr: 2,
              display: "flex",
              alignItems: "center",
              color: "text.primary",
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

          <div style={{ flexGrow: 1 }} />
          <Button>Login</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;

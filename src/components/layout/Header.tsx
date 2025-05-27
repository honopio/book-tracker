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
        color="default"
        component="header"
        sx={{
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2, display: "flex", alignItems: "center" }}
          >
            <LocalLibraryIcon />
            <Typography
              variant="h6"
              component="div"
              sx={{ ml: 1.5, flexGrow: 1 }}
            >
              BookTracker
            </Typography>
          </IconButton>

          <div style={{ flexGrow: 1 }} />
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;

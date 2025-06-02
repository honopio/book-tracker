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
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Person,
  Close,
  Book,
  Add,
  TrendingUp,
  Logout,
  SpaceDashboard,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const DRAWER_WIDTH = 320;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

function Sidebar({ open, onClose }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const user = useAuth();

  let menuItems = [
    { text: "My Dashboard", icon: <SpaceDashboard />, to: "/dashboard" },
    { text: "My library", icon: <Book />, to: "/library" },
    { text: "Add a book", icon: <Add />, to: "/add-book" },
  ];
  if (user) {
    menuItems.push({ text: "Log out", icon: <Logout />, to: "/login" });
  } else {
    menuItems.push({ text: "Log in", icon: <Person />, to: "/login" });
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    console.log("signed out");
    if (error) {
      console.error("Error signing out:", error);
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant="temporary"
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
        },
      }}
    >
      <Box
        sx={{
          width: DRAWER_WIDTH,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        role="presentation"
      >
        {isMobile && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <ListItemButton onClick={onClose}>
              <Close />
            </ListItemButton>
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
          <Link to={user ? "/dashboard" : "/login"}>
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
          </Link>
          <Typography variant="h6" gutterBottom>
            {user?.email || "Not logged in"}
          </Typography>
        </Box>

        <Divider />

        {/* Menu Items */}
        <List sx={{ flexGrow: 1, pt: 2 }}>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={item.to}
                onClick={() => {
                  onClose();
                  if (item.text === "Log out") {
                    signOut();
                  }
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
    </Drawer>
  );
}
export default Sidebar;

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
} from "@mui/material";
import { Person, Book, Add, Logout, SpaceDashboard } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

function Sidebar({ open, onClose }: SidebarProps) {
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
    if (error) {
      console.error("Error signing out:", error);
    } else {
      navigate("/login");
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
    >
      <Box
        sx={{
          width: { xs: 220, sm: 320 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        role="presentation"
      >
        {/* User Profile Section */}
        <Box
          sx={{
            p: 3,
            backgroundColor: "secondary.main",
            color: "secondary.contrastText",
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
          <Typography
            gutterBottom
            sx={{
              fontSize: { xs: "0.9rem", sm: "1.1rem" },
            }}
          >
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

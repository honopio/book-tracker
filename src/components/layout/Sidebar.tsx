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
} from "@mui/icons-material";

const DRAWER_WIDTH = 320;

const menuItems = [
  { text: "My library", icon: <Book />, action: () => {} },
  { text: "Reading Stats", icon: <TrendingUp />, action: () => {} },
  { text: "Add a book", icon: <Add />, action: () => {} },
  { text: "Logout", icon: <Logout />, action: () => {} },
];

function Sidebar({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
                onClose();
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
          boxSizing: "border-box",
          backgroundColor: "background.paper",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}

export default Sidebar;

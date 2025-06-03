import { Alert, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const LoggedOffAlert = ({ customText }: { customText?: string }) => {
  return (
    <Box sx={{ my: 4, textAlign: "center" }}>
      <Alert
        severity="info"
        color="success"
        sx={{ mb: 3, fontSize: { xs: "1rem", sm: "1.2rem" } }}
      >
        {customText || (
          <>
            This is a demo with sample books.{" "}
            <Link to="/login" style={{ color: "inherit" }}>
              Log in or sign up
            </Link>{" "}
            to start tracking your own reading!
          </>
        )}
      </Alert>
    </Box>
  );
};

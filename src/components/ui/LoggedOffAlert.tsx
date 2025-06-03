import { Alert, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const LoggedOffAlert = ({ customText }: { customText?: string }) => {
  return (
    <Box sx={{ my: 4, textAlign: "center" }}>
      <Alert severity="info" sx={{ mb: 3, fontSize: "1.25rem" }}>
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

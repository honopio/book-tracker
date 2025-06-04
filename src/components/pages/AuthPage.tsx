import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  Container,
  Tab,
  Tabs,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LocalLibrary,
  Email,
  Lock,
  CheckCircle,
} from "@mui/icons-material";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";

type AuthMode = "signin" | "signup" | "forgot" | "reset-sent";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate("/dashboard");
    });
  }, [navigate]);

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setMessage(null);
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(
          formData.email
        );
        if (error) throw error;
        setMode("reset-sent");
        return;
      }

      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });
        if (error) throw error;
        setMessage({
          type: "success",
          text: "Check your email to confirm your registration and complete setup.",
        });
        return;
      }

      // Sign in
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;

      navigate("/dashboard");
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    }
  };

  // Reset sent confirmation screen
  if (mode === "reset-sent") {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <Container maxWidth="sm">
          <Card sx={{ borderRadius: 4 }} elevation={5}>
            <CardContent sx={{ p: 6, textAlign: "center" }}>
              <CheckCircle
                sx={{ fontSize: 64, color: "primary.main", mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Email Sent!
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Check your email for password reset instructions.
              </Typography>
              <Button onClick={() => switchMode("signin")} fullWidth>
                Back to Sign In
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  const isSignUp = mode === "signup";
  const isForgot = mode === "forgot";

  return (
    <Box
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: 4 }}
    >
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 4 }} elevation={5}>
          <CardContent sx={{ p: 6 }}>
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <LocalLibrary
                sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
              />
              <Typography variant="h4" component="h1" gutterBottom>
                {isForgot ? "Reset Password" : "BookTracker"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {isForgot
                  ? "Enter your email address and we'll send you a link to reset your password."
                  : "Track your reading journey with ease"}
              </Typography>
            </Box>

            {/* Tabs - only show for main auth modes */}
            {!isForgot && (
              <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                <Tabs
                  value={isSignUp ? 1 : 0}
                  onChange={(_, newValue) =>
                    switchMode(newValue === 1 ? "signup" : "signin")
                  }
                  variant="fullWidth"
                >
                  <Tab label="Sign In" />
                  <Tab label="Sign Up" />
                </Tabs>
              </Box>
            )}

            {/* Message Alert */}
            {message && (
              <Alert severity={message.type} sx={{ mb: 3 }}>
                {message.text}
              </Alert>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                required
                autoComplete="username"
                sx={{ mb: 3 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* password input only for main auth modes */}
              {!isForgot && (
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  required
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  sx={{ mb: 3 }}
                  helperText={isSignUp ? "Minimum 6 characters" : ""}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: 2, py: 1.5 }}
              >
                {isForgot
                  ? "Send Reset Email"
                  : isSignUp
                  ? "Create Account"
                  : "Sign In"}
              </Button>

              {/* Footer actions */}
              {isForgot ? (
                <Button fullWidth onClick={() => switchMode("signin")}>
                  Back to Sign In
                </Button>
              ) : mode === "signin" ? (
                <Box sx={{ textAlign: "center" }}>
                  <Link
                    component="button"
                    type="button"
                    onClick={() => switchMode("forgot")}
                    sx={{ cursor: "pointer" }}
                  >
                    Forgot password?
                  </Link>
                </Box>
              ) : (
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  By signing up, you agree to our Terms of Service and Privacy
                  Policy
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

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

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signupMsg, setSignupMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate("/dashboard");
    });
  }, [navigate]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError("");
    setSignupMsg("");
    setForgotPassword(false);
    setResetEmailSent(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSignupMsg("");

    if (tabValue === 1) {
      // Sign Up
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setSignupMsg(
          "Check your email to confirm your registration and complete setup."
        );
      }
    } else {
      // Sign In
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        navigate("/dashboard");
      }
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setError(error.message);
    } else {
      setResetEmailSent(true);
    }
  };

  // Forgot Password Screen
  if (forgotPassword) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="sm">
          <Card sx={{ borderRadius: 4 }} elevation={5}>
            <CardContent sx={{ p: 6 }}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <LocalLibrary
                  sx={{
                    fontSize: 48,
                    color: "primary.main",
                    mb: 2,
                  }}
                />
                <Typography variant="h4" component="h1" gutterBottom>
                  Reset Password
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {resetEmailSent ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <CheckCircle
                    sx={{ fontSize: 64, color: "primary.main", mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Email Sent!
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3 }}>
                    Check your email for password reset instructions.
                  </Typography>
                  <Button onClick={() => setForgotPassword(false)} fullWidth>
                    Back to Sign In
                  </Button>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleForgotPassword}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{ mb: 3 }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2, py: 1.5 }}
                  >
                    Send Reset Email
                  </Button>

                  <Button fullWidth onClick={() => setForgotPassword(false)}>
                    Back to Sign In
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  // Main auth form
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 4 }} elevation={5}>
          <CardContent sx={{ p: 6 }}>
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <LocalLibrary
                sx={{
                  fontSize: 48,
                  color: "primary.main",
                  mb: 2,
                }}
              />
              <Typography variant="h4" component="h1" gutterBottom>
                BookTracker
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Track your reading journey with ease
              </Typography>
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
              >
                <Tab label="Sign In" />
                <Tab label="Sign Up" />
              </Tabs>
            </Box>

            {/* Alerts */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {signupMsg && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {signupMsg}
              </Alert>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={
                  tabValue === 1 ? "new-password" : "current-password"
                }
                sx={{ mb: 3 }}
                helperText={tabValue === 1 ? "Minimum 6 characters" : ""}
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: 2, py: 1.5 }}
              >
                {tabValue === 1 ? "Create Account" : "Sign In"}
              </Button>

              {/* Forgot password link on sign in tab */}
              {tabValue === 0 && (
                <Box sx={{ textAlign: "center" }}>
                  <Link
                    component="button"
                    type="button"
                    onClick={() => setForgotPassword(true)}
                    sx={{ cursor: "pointer" }}
                  >
                    Forgot password?
                  </Link>
                </Box>
              )}

              {/* Sign up terms on sign up tab */}
              {tabValue === 1 && (
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

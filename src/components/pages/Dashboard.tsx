import { Box, Container, Typography, Grid, Paper, Chip } from "@mui/material";

const Dashboard = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fdf9f2",
        py: 3,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h3">My Reading Dashboard</Typography>

        <Grid
          container
          spacing={3}
          sx={{ height: "calc(100vh - 200px)", margin: "50px" }}
        >
          {/* Left column - 2 horizontal boxes */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Grid container spacing={3} sx={{ height: "100%" }}>
              {/* Currently Reading Box */}
              <Grid size={12} sx={{ height: "50%" }}>
                <Paper
                  elevation={1}
                  sx={{
                    height: "100%",
                    p: 3,
                    backgroundColor: "#d8e5cd",
                    border: "1px solid var(--accent)",
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "none",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        color: "#110e03",
                        fontWeight: 600,
                      }}
                    >
                      Currently Reading
                    </Typography>
                    <Chip
                      label={`3 books`}
                      sx={{
                        backgroundColor: "#6f9c68",
                        color: "#fdf9f2",
                        fontSize: "0.875rem",
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid size={12} sx={{ height: "50%" }}>
                <Paper
                  elevation={1}
                  sx={{
                    height: "100%",
                    p: 3,
                    backgroundColor: "#aa84cc",
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        color: "#fdf9f2",
                        fontWeight: 600,
                      }}
                    >
                      Want to Read
                    </Typography>
                    <Chip
                      label={`2 books`}
                      sx={{
                        backgroundColor: "#6f4c93",
                        color: "#fdf9f2",
                        fontSize: "0.875rem",
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Right column - 1 vertical box */}
          <Grid size={12} lg={4}>
            <Paper
              elevation={1}
              sx={{
                height: "100%",
                p: 3,
                backgroundColor: "#6f9c68",
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    color: "#fdf9f2",
                    fontWeight: 600,
                  }}
                >
                  Finished Books
                </Typography>
                <Chip
                  label={`2 books`}
                  sx={{
                    backgroundColor: "#5a7d54",
                    color: "#fdf9f2",
                    fontSize: "0.875rem",
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;

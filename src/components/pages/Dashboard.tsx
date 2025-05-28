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
        <Typography variant="h3" mb={4}>
          My Reading Dashboard
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* Left column: two stacked areas */}
          <Grid
            sx={{
              flex: 2,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Paper
              elevation={1}
              sx={{
                height: 220,
                p: 3,
                backgroundColor: "#d8e5cd",
                border: "1px solid var(--accent)",
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                boxShadow: "none",
                mb: 2,
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
                  label="nb of books"
                  sx={{
                    backgroundColor: "#6f9c68",
                    color: "#fdf9f2",
                    fontSize: "0.875rem",
                  }}
                />
              </Box>
            </Paper>
            <Paper
              elevation={1}
              sx={{
                height: 220,
                p: 3,
                backgroundColor: "#aa84cc",
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
                    color: "#fdf9f2",
                    fontWeight: 600,
                  }}
                >
                  Want to Read
                </Typography>
                <Chip
                  label="nb of books"
                  sx={{
                    backgroundColor: "#6f4c93",
                    color: "#fdf9f2",
                    fontSize: "0.875rem",
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Right column: finished books */}
          <Grid
            sx={{
              flex: 1,
              minWidth: 0,
              display: "flex",
            }}
          >
            <Paper
              elevation={1}
              sx={{
                width: "100%",
                height: 463, // match the combined height of left column
                p: 3,
                backgroundColor: "#6f9c68",
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
                  label="nb of books"
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

import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  useMediaQuery,
} from "@mui/material";

const Dashboard = () => {
  const isSmall = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: "5%",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h1" component="h1" m={8} align="center">
          My Reading Dashboard
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            flexDirection: isSmall ? "column" : "row",
          }}
        >
          {/* Left column: two stacked areas */}
          <Grid
            sx={{
              flex: isSmall ? "unset" : 2,
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
                  }}
                >
                  Currently Reading
                </Typography>
                <Chip
                  label="see all"
                  onClick={seeAll}
                  variant="outlined"
                  sx={{
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
                  }}
                >
                  Want to Read
                </Typography>
                <Chip
                  label="see all"
                  onClick={seeAll}
                  sx={{
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
              flex: isSmall ? "unset" : 1,
              minWidth: 0,
              display: "flex",
              mt: isSmall ? 2 : 0,
            }}
          >
            <Paper
              elevation={1}
              sx={{
                width: "100%",
                height: isSmall ? 220 : 463,
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
                  }}
                >
                  Finished Books
                </Typography>
                <Chip
                  label="see all"
                  onClick={seeAll}
                  sx={{
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

const seeAll = () => {
  console.log("See all books clicked");
};

export default Dashboard;

import {
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertType, setAlertType] = useState("success");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username || !password) {
      setMessage("Name, Username and password are required");
      setAlertType("error");
      setOpenSnackbar(true);
      setIsLoading(false);
      return;
    }

    const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/users/`;

    try {
      const response = await axios.post(
        apiEndpoint,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(response.data.message);
      setAlertType("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("User creation error:", error);
      if (error.response) {
        if (error.response.data && error.response.data.error !== undefined) {
          setMessage(error.response.data.error.username[0]);
          setAlertType("error");
          setOpenSnackbar(true);
          return;
        }
        setMessage(
          error.response.data.detail ||
            "An error occurred during creation of user."
        );
        setAlertType("error");
        setOpenSnackbar(true);
      } else if (error.request) {
        setMessage("No response received from the server. Please try again.");
        setAlertType("error");
        setOpenSnackbar(true);
      } else {
        setMessage("An unexpected error occurred. Please try again.");
        setAlertType("error");
        setOpenSnackbar(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={alertType}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
        <Paper
          elevation={6}
          sx={{ padding: 4, margin: 2, textAlign: "center" }}
        >
          <Box display="flex" justifyContent="center" mb={2}>
            <img
              src="https://www.incnow.com/wp-content/uploads/2023/08/Shutterstock_1059255266-scaled.jpg"
              alt="CompanyLogo"
              style={{ height: 60, borderRadius: "5px" }}
            />
          </Box>
          <Typography component="h1" variant="h6" align="center" gutterBottom>
            Only superusers can add users.
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Add user"}
            </Button>
          </form>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            mt={4}
          >
            &copy; {new Date().getFullYear()} Website.
          </Typography>
        </Paper>
      </>
    </Container>
  );
};

export default CreateUser;

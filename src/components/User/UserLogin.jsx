import {
    Button,
    CircularProgress,
    Container,
    Paper,
    TextField,
    Typography,
    Box
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        if (!username || !password) {
            setError("Username and password are required");
            setIsLoading(false);
            return;
        }

        const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/login/`;
        console.log("YY",apiEndpoint)

        try {
            const response = await axios.post(apiEndpoint, {username, password }, {
                headers: {
                  "Content-Type": "application/json",
                },
              });
            // setSuccess(response.data.message);
            console.log("OKOK",response)
            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user.id);
            localStorage.setItem("userRole", "user");
            localStorage.setItem("username", response.data.user.username);
            setUsername("");
            setPassword("");
            navigate("/user-dashboard")
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || "An error occurred during Register");
            } else if (error.request) {
                setError("No response received from the server. Please try again.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <Container component="main">
            <Container maxWidth="xs" sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'100%'}}>
            <Paper elevation={6} sx={{ padding: 4, margin: 2 }}>
            <Box display="flex" justifyContent="center" mb={2}>
                    <img
                        src="https://www.incnow.com/wp-content/uploads/2023/08/Shutterstock_1059255266-scaled.jpg"
                        alt="CompanyLogo"
                        style={{ height: 60, borderRadius:'5px' }}
                    />
                </Box>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    Welcome to Website
                </Typography>
                {/* <Typography component="h1" variant="h5" align="center" gutterBottom>
                    User
                </Typography> */}
                
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
                    {error && (
                        <Typography color="error" variant="body2" align="center" gutterBottom>
                            {error}
                        </Typography>
                    )}
                    {success && (
                        <Typography color="success" variant="body2" align="center" gutterBottom>
                            {success}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : "Login"}
                    </Button>
                </form>
                <Typography variant="body2" color="textSecondary" align="center" mt={4}>
                    &copy; {new Date().getFullYear()} Website.
                </Typography>
            </Paper>
            </Container>
        </Container>
    );
};

export default UserLogin;
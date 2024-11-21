import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

function UserHeader({ handleSidebarToggle, handleLogout }) {

    const name = localStorage.getItem('username')


    const handleLogoutButtonClick = () => {
            handleLogout();
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: "rgba(224, 224, 224, 0.7)",
                    backdropFilter: "blur(5px)",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    transition: "top 0.3s ease",
                    width: "100%",
                    zIndex: 1100,
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ minHeight: "64px" }}>
                        <IconButton
                            onClick={handleSidebarToggle}
                            sx={{ mr: 2 }}
                            color="info"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexGrow: 1,
                            }}
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/6214/6214076.png"
                                alt="Logo"
                                style={{
                                    height: "40px",
                                    width: "auto",
                                    marginRight: "16px",
                                }}
                            />

                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{
                                    color: "#07752A",
                                    flexGrow: 1,
                                    textAlign: "center",
                                    display: { xs: "none", sm: "block" },
                                }}
                            >
                                <b>{name}</b>
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/6214/6214076.png"
                                alt="School Logo"
                                style={{
                                    height: "40px",
                                    width: "auto",
                                    marginRight: "16px",
                                }}
                            />
                            <Button variant="contained" onClick={handleLogoutButtonClick}>Logout</Button>
                            
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {/* Page content goes here */}
            <Box sx={{ marginTop: "65px" }}></Box>
        </>
    );
}

export default UserHeader;

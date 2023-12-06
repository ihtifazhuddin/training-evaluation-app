import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const showNotification = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 3000); // Clear the error message after 3 seconds
  };

  useEffect(() => {
    // Clear all local storage except "access_token"
    Object.keys(localStorage).forEach((key) => {
      if (key !== "access_token") {
        localStorage.removeItem(key);
      }
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send username and password to backend for login
      const loginResponse = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${username}&password=${password}`,
      });

      const loginData = await loginResponse.json();
      if (loginData.result === 0) {
        // Get staff details using staff_id
        const staffDetailsResponse = await fetch(
          `http://127.0.0.1:5000/get-staff-details`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `staff_id=${loginData.data.staff_id}`,
          }
        );

        // Get HR details using staff details call :)
        const hrDetailsResponse = await fetch(
          `http://127.0.0.1:5000/get-staff-details`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `staff_id=1`,
          }
        );

        const staffDetailsData = await staffDetailsResponse.json();
        const hrDetailsData = await hrDetailsResponse.json();

        if (staffDetailsData.result === 0 && hrDetailsData.result === 0) {
          localStorage.setItem("staff_id", loginData.data.staff_id);
          localStorage.setItem("staff_name", staffDetailsData.data.name);
          localStorage.setItem("staff_position", staffDetailsData.data.position); // prettier-ignore
          localStorage.setItem("staff_division",staffDetailsData.data.division); // prettier-ignore
          localStorage.setItem("staff_role", staffDetailsData.data.role);
          localStorage.setItem("staff_keyword", staffDetailsData.data.secretkeyword); // prettier-ignore
          localStorage.setItem("staff_email", staffDetailsData.data.email); // prettier-ignore

          localStorage.setItem("hr_name", hrDetailsData.data.name); // prettier-ignore
          localStorage.setItem("hr_role", hrDetailsData.data.role); // prettier-ignore
          localStorage.setItem("hr_keyword", hrDetailsData.data.secretkeyword); // prettier-ignore
          localStorage.setItem("hr_email", hrDetailsData.data.email); // prettier-ignore

          if (staffDetailsData.data.role === "HR") {
            localStorage.setItem("current_user_role", "HR");
            navigate("/hr/evaluations");
          } else if (staffDetailsData.data.role === "Staff") {
            localStorage.setItem("current_user_role", "Staff");
            navigate("/staff/trainings");
          }
        } else {
          console.error(
            "Error fetching staff details:",
            staffDetailsData.message
          );
          showNotification("Error fetching staff details");
        }
      } else {
        console.error("Error occured:", loginData.message);
        showNotification("Error occured.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      showNotification("Unexpected error occurred");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

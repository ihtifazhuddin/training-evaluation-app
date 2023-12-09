import React from "react";
import { Button, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const StyledButton = styled(Button)({
  color: "white",
  marginLeft: "20px",
  fontSize: "15px",
  fontWeight: "bold",
  borderColor: "white",
  borderRadius: "10px",
  borderWidth: "1.5px",
});

const Header = () => {
  const navigate = useNavigate();

  const current_user_role = localStorage.getItem("current_user_role");

  const handleSignOut = () => {
    console.log("Signing out...");
    navigate("/", { replace: true });
  };

  const menuItems =
    current_user_role === "HR"
      ? [{ text: "Evaluations", link: "/hr/evaluations" }]
      : [
          { text: "Trainings", link: "/staff/trainings" },
          { text: "Evaluations", link: "/staff/evaluations" },
        ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          background: defaultTheme.palette.primary.main,
          width: "100%",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h1"
          fontWeight="bold"
          fontSize="25px"
          color="white"
        >
          Training Evaluation App
        </Typography>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {menuItems.map((item, index) => (
            <StyledButton
              variant="outlined"
              key={index}
              component={Link}
              to={item.link}
            >
              {item.text}
            </StyledButton>
          ))}
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography fontWeight="bold" fontSize="16px" color="white">
              (Logged in as <b>{current_user_role}</b>)
            </Typography>
            <Button onClick={handleSignOut} style={{ color: "white" }}>
              <ExitToAppIcon fontSize="large" />
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Header;

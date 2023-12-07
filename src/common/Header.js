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
});

const StyledIconButton = styled(Button)({
  fontSize: "13px",
  color: "white",
  borderColor: "white",
  marginLeft: "15px",
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
          padding: "20px",
          background: defaultTheme.palette.primary.main,
          width: "100%",
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

        <div style={{ display: "flex", alignItems: "center" }}>
          {menuItems.map((item, index) => (
            <StyledButton key={index} component={Link} to={item.link}>
              {item.text}
            </StyledButton>
          ))}
          <StyledIconButton onClick={handleSignOut} variant="outlined">
            <span style={{ marginRight: "8px" }}>Sign Out</span>
            <ExitToAppIcon />
          </StyledIconButton>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Header;

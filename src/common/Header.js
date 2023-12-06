import React from "react";
import { Button, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StyledIconButton = styled(Button)({
  fontSize: "13px",
  color: "white",
  borderColor: "white",
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        background: "#0063F7",
        width: "100%",
      }}
    >
      <Typography variant="h1" fontWeight="bold" fontSize="25px" color="white">
        Training Evaluation App
      </Typography>

      <div style={{ display: "flex", alignItems: "center" }}>
        {menuItems.map((item, index) => (
          <Button
            key={index}
            component={Link}
            to={item.link}
            style={{ color: "white", marginLeft: "20px" }}
          >
            {item.text}
          </Button>
        ))}
        <StyledIconButton
          onClick={handleSignOut}
          variant="outlined"
          style={{ marginLeft: "15px" }}
        >
          <span style={{ marginRight: "8px" }}>Sign Out</span>
          <ExitToAppIcon />
        </StyledIconButton>
      </div>
    </div>
  );
};

export default Header;

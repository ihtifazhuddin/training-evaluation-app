import React from "react";
import Header from "./Header";
import { Typography, Container, ThemeProvider } from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";

const defaultTheme = createTheme();

const StyledContainer = styled(Container)({
  paddingTop: "20px",
  textAlign: "center",
});

export default function NoPage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <Header />
        <StyledContainer>
          <Typography variant="h1" color="primary" gutterBottom fontSize="50px">
            ERROR 404:
          </Typography>
          <Typography variant="h2" color="secondary" fontSize="30px">
            The page you are looking for does not exist or has been removed.
          </Typography>
        </StyledContainer>
      </>
    </ThemeProvider>
  );
}

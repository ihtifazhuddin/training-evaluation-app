import React from "react";
import Header from "./Header";
import { Typography, Container } from "@mui/material";

export default function NoPage() {
  return (
    <>
      <Header />
      <Container>
        <Typography variant="h1" color="primary" gutterBottom>
          ERROR 404:
        </Typography>
        <Typography variant="h2" color="secondary">
          The page you are looking for does not exist or has been removed.
        </Typography>
      </Container>
    </>
  );
}

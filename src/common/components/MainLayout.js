import React from "react";
import { Grid } from "@mui/material";
import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <Grid container>
      <Header />
      <div style={{ width: "100%" }}>{children}</div>
    </Grid>
  );
};

export default MainLayout;

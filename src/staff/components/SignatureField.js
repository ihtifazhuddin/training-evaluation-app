import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const SignatureField = () => {
  const staff_name = localStorage.getItem("staff_name");
  const staff_role = localStorage.getItem("staff_role");
  const hr_name = localStorage.getItem("hr_name");
  const hr_role = localStorage.getItem("hr_role");

  return (
    <TableContainer
      component={Paper}
      style={{ marginTop: "5px", marginBottom: "3px" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={2}
              align="left"
              style={{
                backgroundColor: "#1976d2",
                color: "white",
                fontWeight: "bold",
                lineHeight: "5px",
              }}
            >
              Signature:
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>
              <Typography id="signstaff" style={{ fontSize: "15px" }}>
                <br />
                <br />
                Name: {staff_name}
              </Typography>
              <Typography style={{ fontSize: "15px" }}>
                Role : {staff_role}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography id="signhr" style={{ fontSize: "15px" }}>
                <br />
                <br />
                Name: {hr_name}
              </Typography>
              <Typography style={{ fontSize: "15px" }}>
                Role : {hr_role}{" "}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SignatureField;

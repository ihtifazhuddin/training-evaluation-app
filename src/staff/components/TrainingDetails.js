import React from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
const TrainingDetails = () => {
  const staff_name = localStorage.getItem("staff_name");
  const staff_division = localStorage.getItem("staff_division");
  const training_title = localStorage.getItem("training_title");
  const training_trainer = localStorage.getItem("training_trainer");
  const training_date = localStorage.getItem("training_date");
  const training_venue = localStorage.getItem("training_venue");

  return (
    <Paper>
      <Typography
        variant="h1"
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          fontSize: "16px",
          marginTop: "8px",
          lineHeight: "25px",
          paddingLeft: "10px",
        }}
      >
        Training Details
      </Typography>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>Name</strong>
            </TableCell>

            <TableCell>{staff_name}</TableCell>

            <TableCell>
              <strong>Division</strong>
            </TableCell>

            <TableCell>{staff_division}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Trainer</strong>
            </TableCell>
            <TableCell>{training_trainer}</TableCell>
            <TableCell>
              <strong> Training Date</strong>
            </TableCell>
            <TableCell>{training_date}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Training Title</strong>
            </TableCell>
            <TableCell>{training_title}</TableCell>
            <TableCell>
              <strong>Training Venue</strong>
            </TableCell>
            <TableCell>{training_venue}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TrainingDetails;

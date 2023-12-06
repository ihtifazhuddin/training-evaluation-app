import React, { useState, useEffect } from "react";
import MainLayout from "../../common/MainLayout";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function TrainingListPage() {
  const [trainingsData, setTrainingsData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get-trainings")
      .then((response) => response.json())
      .then((data) => {
        setTrainingsData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching training list:", error);
      });
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const handleSaveTrainingDetails = (training) => {
    const formattedDate = formatDate(training.training_datetime);

    localStorage.setItem("training_id", training.training_id);
    localStorage.setItem("training_title", training.title);
    localStorage.setItem("training_trainer", training.trainer);
    localStorage.setItem("training_date", formattedDate);
    localStorage.setItem("training_venue", training.venue);
  };

  return (
    <MainLayout>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  borderTop: "2px solid",
                  borderBottom: "2px solid",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                ID
              </TableCell>
              <TableCell
                style={{
                  borderTop: "2px solid",
                  borderBottom: "2px solid",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Title
              </TableCell>
              <TableCell
                style={{
                  borderTop: "2px solid",
                  borderBottom: "2px solid",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Trainer
              </TableCell>
              <TableCell
                style={{
                  borderTop: "2px solid",
                  borderBottom: "2px solid",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Date
              </TableCell>
              <TableCell
                style={{
                  borderTop: "2px solid",
                  borderBottom: "2px solid",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Venue
              </TableCell>
              <TableCell
                style={{
                  borderTop: "2px solid",
                  borderBottom: "2px solid",
                  padding: "0 20px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainingsData.map((training, index) => (
              <TableRow key={training.training_id}>
                <TableCell style={{ textAlign: "center" }}>
                  {training.training_id}
                </TableCell>
                <TableCell>{training.title}</TableCell>
                <TableCell>{training.trainer}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {formatDate(training.training_datetime)}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {training.venue}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/staff/create/`}
                    onClick={() => handleSaveTrainingDetails(training)}
                  >
                    Create Evaluation
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
}

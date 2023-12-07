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
  ThemeProvider,
} from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

const StyledTableContainer = styled(TableContainer)({
  marginTop: "20px",
});

const StyledTableCell = styled(TableCell)({
  borderTop: "1px solid",
  borderBottom: "1px solid",
  textAlign: "center",
});

const StyledButton = styled(Button)({
  margin: "5px",
});

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
    <ThemeProvider theme={defaultTheme}>
      <MainLayout>
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow
                style={{ borderTop: "2px solid", borderBottom: "2px solid" }}
              >
                <StyledTableCell style={{ fontWeight: "bold" }}>
                  ID
                </StyledTableCell>
                <StyledTableCell style={{ fontWeight: "bold" }}>
                  Title
                </StyledTableCell>
                <StyledTableCell style={{ fontWeight: "bold" }}>
                  Trainer
                </StyledTableCell>
                <StyledTableCell style={{ fontWeight: "bold" }}>
                  Date
                </StyledTableCell>
                <StyledTableCell style={{ fontWeight: "bold" }}>
                  Venue
                </StyledTableCell>
                <StyledTableCell style={{ fontWeight: "bold" }}>
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trainingsData.map((training, index) => (
                <TableRow key={training.training_id}>
                  <StyledTableCell style={{ textAlign: "center" }}>
                    {training.training_id}
                  </StyledTableCell>
                  <StyledTableCell>{training.title}</StyledTableCell>
                  <StyledTableCell>{training.trainer}</StyledTableCell>
                  <StyledTableCell style={{ textAlign: "center" }}>
                    {formatDate(training.training_datetime)}
                  </StyledTableCell>
                  <StyledTableCell style={{ textAlign: "center" }}>
                    {training.venue}
                  </StyledTableCell>
                  <StyledTableCell style={{ textAlign: "center" }}>
                    <StyledButton
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/staff/create/`}
                      onClick={() => handleSaveTrainingDetails(training)}
                    >
                      Create Evaluation
                    </StyledButton>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </MainLayout>
    </ThemeProvider>
  );
}

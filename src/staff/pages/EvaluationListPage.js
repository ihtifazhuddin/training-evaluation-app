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

export default function EvaluationListPage() {
  const [evaluationData, setEvaluationData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get-evaluations")
      .then((response) => response.json())
      .then((data) => {
        setEvaluationData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching evaluation list:", error);
      });
  }, []);

  const handleViewDocument = () => {
    console.log("View document is clicked");
  };
  const handleAutoSign = () => {
    console.log("Auto sign is clicked");
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
                Evaluation ID
              </TableCell>
              <TableCell
                style={{
                  borderTop: "2px solid",
                  borderBottom: "2px solid",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Training Title
              </TableCell>
              <TableCell
                style={{
                  borderTop: "2px solid",
                  borderBottom: "2px solid",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Staff Name
              </TableCell>
              <TableCell
                style={{
                  borderTop: "2px solid",
                  borderBottom: "2px solid",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                State
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
            {evaluationData.map((evaluation) => (
              <TableRow key={evaluation.evaluation_id}>
                <TableCell
                  style={{
                    textAlign: "center",
                  }}
                >
                  {evaluation.evaluation_id}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                  }}
                >
                  {evaluation.training_name}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                  }}
                >
                  {evaluation.staff_name}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                  }}
                >
                  {evaluation.state}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleViewDocument}
                  >
                    View
                  </Button>
                  <Button
                    style={{ marginLeft: "5px" }}
                    variant="contained"
                    color="primary"
                    onClick={handleAutoSign}
                  >
                    Auto Sign
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
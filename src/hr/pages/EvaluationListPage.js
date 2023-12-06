import React, { useState, useEffect } from "react";
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
import MainLayout from "../../common/MainLayout";
import AutoSign from "../../components/AutoSign";
import { GetPreviewLink } from "../../components/GetPreviewLink";
import { UpdateEvaluation } from "../../components/UpdateEvaluation";

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

  const handleViewDocument = (contractnum) => {
    localStorage.setItem("contractnum", contractnum);
    GetPreviewLink(contractnum).then((link) => {
      window.open(link, "_blank");
    });
  };

  const handleAutoSign = (evaluation_id) => {
    localStorage.setItem("evaluation_id", evaluation_id);
    AutoSign()
      .then((result) => {
        window.alert(result);
        UpdateEvaluation();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error during auto sign:", error);
      });
  };

  const handleDownload = (contractnum, state) => {
    console.log("Download button is clicked");
    if (state === "Completed") {
      // Enable download functionality
    } else if (state === "Pending") {
      // Disable download functionality
      return;
    }
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
                    onClick={() => handleViewDocument(evaluation.contractnum)}
                  >
                    View
                  </Button>
                  <Button
                    style={{ marginLeft: "5px" }}
                    variant="contained"
                    color="primary"
                    onClick={() => handleAutoSign(evaluation.evaluation_id)}
                    disabled={evaluation.state === "Completed"}
                  >
                    Auto Sign
                  </Button>
                  <Button
                    style={{ marginLeft: "5px" }}
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleDownload(evaluation.contractnum, evaluation.state)
                    }
                    disabled={evaluation.state === "Pending"}
                  >
                    Download
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

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
  ThemeProvider,
} from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import MainLayout from "../../common/components/MainLayout";
import { GetPreviewLink } from "../../common/functional-components/GetPreviewLink";
import { DownloadDocument } from "../../common/functional-components/DownloadDocument";
import { Typography } from "antd";

const defaultTheme = createTheme();

const StyledTableContainer = styled(TableContainer)({
  marginTop: "20px",
});

const StyledTableCell = styled(TableCell)({
  borderBottom: "1px solid",
  textAlign: "center",
});

const StyledButton = styled(Button)({
  margin: "5px",
});

const StyledTableHeaderRow = styled(TableRow)({
  borderTop: "2px solid",
  borderBottom: "2px solid",
});

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

  const handleDownload = (contractnum, training_name, staff_name) => {
    localStorage.setItem("contractnum", contractnum);
    localStorage.setItem("training_name", training_name);
    localStorage.setItem("staff_name", staff_name);
    DownloadDocument()
      .then(() => {
        console.log("Download successful");
      })
      .catch((error) => {
        console.error("Error during download:", error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <MainLayout>
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <StyledTableHeaderRow>
                <StyledTableCell style={{ fontWeight: "bold" }}>
                  Evaluation ID
                </StyledTableCell>
                <StyledTableCell style={{ fontWeight: "bold" }}>
                  Training Title
                </StyledTableCell>
                <StyledTableCell style={{ fontWeight: "bold" }}>
                  Staff Name
                </StyledTableCell>
                <StyledTableCell style={{ fontWeight: "bold" }}>
                  State
                </StyledTableCell>
                <StyledTableCell style={{ fontWeight: "bold" }}>
                  Actions
                </StyledTableCell>
              </StyledTableHeaderRow>
            </TableHead>
            <TableBody>
              {evaluationData.length === 0 ? (
                <TableRow>
                  <StyledTableCell colSpan={5}>
                    <Typography
                      variant="body1"
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        fontStyle: "italic",
                        color: "grey",
                      }}
                    >
                      There are no evaluations yet
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              ) : (
                evaluationData.map((evaluation) => (
                  <TableRow key={evaluation.evaluation_id}>
                    <StyledTableCell>
                      {evaluation.evaluation_id}
                    </StyledTableCell>
                    <StyledTableCell>
                      {evaluation.training_name}
                    </StyledTableCell>
                    <StyledTableCell>{evaluation.staff_name}</StyledTableCell>
                    <StyledTableCell>
                      {evaluation.state === "Pending" ? (
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          Waiting for HR approval
                        </span>
                      ) : (
                        <span style={{ color: "green", fontWeight: "bold" }}>
                          Completed
                        </span>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      <StyledButton
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleViewDocument(evaluation.contractnum)
                        }
                      >
                        View
                      </StyledButton>
                      <StyledButton
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleDownload(
                            evaluation.contractnum,
                            evaluation.training_name,
                            evaluation.staff_name
                          )
                        }
                        disabled={evaluation.state === "Pending"}
                      >
                        Download
                      </StyledButton>
                    </StyledTableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </MainLayout>
    </ThemeProvider>
  );
}

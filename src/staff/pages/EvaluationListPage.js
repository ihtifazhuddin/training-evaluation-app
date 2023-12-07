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
import MainLayout from "../../common/MainLayout";
import { GetPreviewLink } from "../../components/GetPreviewLink";
import { DownloadDocument } from "../../components/DownloadDocument";

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
    console.log("Downloading...");
    DownloadDocument()
      .then()
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
              {evaluationData.map((evaluation) => (
                <TableRow key={evaluation.evaluation_id}>
                  <StyledTableCell>{evaluation.evaluation_id}</StyledTableCell>
                  <StyledTableCell>{evaluation.training_name}</StyledTableCell>
                  <StyledTableCell>{evaluation.staff_name}</StyledTableCell>
                  <StyledTableCell>{evaluation.state}</StyledTableCell>
                  <StyledTableCell>
                    <StyledButton
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewDocument(evaluation.contractnum)}
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
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </MainLayout>
    </ThemeProvider>
  );
}

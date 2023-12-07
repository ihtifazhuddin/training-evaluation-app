import React, { useState, useEffect } from "react";
import { Button, CircularProgress, ThemeProvider } from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import MainLayout from "../../common/MainLayout";
import ExcelPreview from "../../components/ExcelPreviewToBytes";
import UploadDocument from "../../components/UploadDocument";
import AutoSign from "../../components/AutoSign";
import { useNavigate } from "react-router-dom";
import AddEvaluation from "../../components/AddEvaluation";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#0063F7",
    },
  },
});

const StyledContainer = styled("div")({
  margin: "20px",
});

const StyledButton = styled(Button)({
  marginTop: "15px",
  fontSize: "12px",
});

const StyledLoadingContainer = styled("div")({
  textAlign: "center",
  marginTop: "20px",
});

const ReviewDocument = () => {
  const [filedata, setFiledata] = useState(null);
  const [loading, setLoading] = useState(true);
  const filename = localStorage.getItem("filename");
  const navigate = useNavigate();

  const generateXLXSview = async (filename) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/generateXLXSview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `filename=${filename}`,
      });

      const responseData = await response.json();

      if (responseData.result === 0) {
        console.log("API call generateXLXSview successful:", responseData);
        localStorage.setItem("filedata", responseData.data.file);
        setFiledata(responseData.data.file);
      } else {
        console.error("API call generateXLXSview failed:", responseData);
      }
    } catch (error) {
      console.error("Error during API call generateXLXSview:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateXLXSview(filename);
  }, [filename]);

  const submitEvaluation = async () => {
    try {
      await UploadDocument(); // Wait for UploadDocument to complete

      await AddEvaluation(); // Wait for AddEvaluation to complete

      await AutoSign(); // Wait for AutoSign to complete

      navigate("/staff/evaluations");
    } catch (error) {
      console.error("Error submitting evaluation:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <MainLayout>
        <StyledContainer>
          {loading ? (
            <StyledLoadingContainer>
              <CircularProgress />
              <p>Loading file preview...</p>
            </StyledLoadingContainer>
          ) : (
            <>
              {filedata ? (
                <ExcelPreview base64String={filedata} />
              ) : (
                <p>No file preview available</p>
              )}
              <StyledButton
                variant="contained"
                color="primary"
                onClick={submitEvaluation}
              >
                Submit and Sign
              </StyledButton>
            </>
          )}
        </StyledContainer>
      </MainLayout>
    </ThemeProvider>
  );
};

export default ReviewDocument;

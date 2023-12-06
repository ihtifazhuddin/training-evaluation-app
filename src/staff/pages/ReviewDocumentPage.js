import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import MainLayout from "../../common/MainLayout";
import ExcelPreview from "../../components/ExcelPreviewToBytes";
import UploadDocument from "../../components/UploadDocument";
import AutoSign from "../../components/AutoSign";
import { useNavigate } from "react-router-dom";

const ReviewDocument = () => {
  const [filedata, setFiledata] = useState(null);
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
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    generateXLXSview(filename);
  }, [filename]);

  const submitEvaluation = async () => {
    try {
      await UploadDocument(); // Wait for UploadDocument to complete

      // Only run AutoSign if UploadDocument is successful
      await AutoSign(); // Wait for AutoSign to complete

      // Only navigate to "/staff/evaluations" if AutoSign is successful
      navigate("/staff/evaluations");
    } catch (error) {
      console.error("Error submitting evaluation:", error);
    }
  };

  return (
    <MainLayout>
      <div>
        {filedata ? (
          <ExcelPreview base64String={filedata} />
        ) : (
          <p>Loading file preview...</p>
        )}

        <Button
          style={{ marginLeft: "15px", marginTop: "5px", fontSize: "12px" }}
          variant="contained"
          color="primary"
          onClick={submitEvaluation}
        >
          Submit and Sign
        </Button>
      </div>
    </MainLayout>
  );
};

export default ReviewDocument;

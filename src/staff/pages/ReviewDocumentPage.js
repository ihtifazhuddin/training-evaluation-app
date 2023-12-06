import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import MainLayout from "../../common/MainLayout";
import ExcelPreview from "../../components/ExcelPreviewToBytes";
import UploadDocument from "../../components/UploadDocument";
import AutoSign from "../../components/AutoSign";
import { GetPreviewLink } from "../../components/GetPreviewLink";
import { AddEvaluation } from "../../components/AddEvaluation";
import { useNavigate } from "react-router-dom";

const ReviewDocument = () => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [signSuccess, setSignSuccess] = useState(false);
  const [viewDocument, setViewDocument] = useState(false);
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

  const submitEvaluation = () => {
    UploadDocument()
      .then(() => {
        setUploadSuccess(true);
      })
      .catch((error) => console.error("Error submitting evaluation:", error));
  };

  const autoSign = () => {
    AutoSign()
      .then(() => {
        setSignSuccess(true);
        setViewDocument(true);
        navigate("/staff/evaluations");
      })
      .catch(() => {
        setSignSuccess(false);
      });
  };

  const handleViewDocument = () => {
    GetPreviewLink().then((link) => {
      window.open(link, "_blank");
    });
  };

  return (
    <MainLayout>
      <div>
        {filedata ? (
          <ExcelPreview base64String={filedata} />
        ) : (
          <p>Loading file preview...</p>
        )}
        {uploadSuccess ? (
          <div>
            <h2 style={{ color: "green" }}>
              {signSuccess ? "Auto Sign Successful" : "Upload Successful"}
            </h2>
            {viewDocument ? (
              <Button
                style={{
                  marginLeft: "15px",
                  marginTop: "5px",
                  fontSize: "12px",
                }}
                variant="contained"
                color="primary"
                onClick={handleViewDocument}
              >
                View Document
              </Button>
            ) : (
              <Button
                style={{
                  marginLeft: "15px",
                  marginTop: "5px",
                  fontSize: "12px",
                }}
                variant="contained"
                color="primary"
                onClick={autoSign}
              >
                Sign Now
              </Button>
            )}
            <AddEvaluation />
          </div>
        ) : (
          <Button
            style={{ marginLeft: "15px", marginTop: "5px", fontSize: "12px" }}
            variant="contained"
            color="primary"
            onClick={submitEvaluation}
          >
            Submit
          </Button>
        )}
      </div>
    </MainLayout>
  );
};

export default ReviewDocument;

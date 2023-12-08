import React, { useRef, useState } from "react";
import {
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
// import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import EvaluationField from "../staff/components/EvaluationField";

const PdfViewer = () => {
  const componentRef = useRef(null);
  const [open, setOpen] = useState(false);
  // const [pdfBase64, setPdfBase64] = useState("");
  // const [imgData, setImgData] = useState("");
  const [imgDataHtml, setImgDataHtml] = useState("");

  const generatePDF = async () => {
    console.log("Generating PDF...");

    const input = componentRef.current;
    console.log("input", input);

    if (input) {
      const canvas = await html2canvas(input);

      const imgData = canvas.toDataURL("image/png");
      // setImgData(imgData);

      const imgDataHtml = `<html><body><img src="${imgData}" width="100%" height="100%"></body></html>`;
      setImgDataHtml(imgDataHtml);

      setOpen(true);

      // const pdf = new jsPDF("p", "mm", "a4");
      // const imgProps = pdf.getImageProperties(imgData);
      // const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Convert PDF to base64 string
      // const pdfBase64String = pdf.output("datauristring");

      // Download the PDF
      // pdf.save("download-file.pdf");
    }
  };

  const handleClose = () => {
    // Close the dialog
    setOpen(false);
  };

  return (
    <div>
      <Paper
        elevation={3}
        ref={componentRef}
        style={{ padding: "20px", marginBottom: "20px" }}
      >
        <EvaluationField />
      </Paper>

      <button onClick={generatePDF}>Preview</button>

      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle>Preview</DialogTitle>
        <DialogContent>
          {/* <iframe
            src={imgData}
            title="Generated PDF Preview"
            width="100%"
            height="100%"
          /> */}
          {/* <img
            src={imgData}
            alt="Generated Preview"
            width="100%"
            height="100%"
          /> */}
          <iframe
            srcDoc={imgDataHtml}
            title="Generated Preview"
            width="100%"
            height="100%"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PdfViewer;

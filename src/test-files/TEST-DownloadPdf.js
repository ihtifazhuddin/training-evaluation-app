import React, { useRef } from "react";
import { Paper } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import EvaluationField from "../staff/components/EvaluationField";

const PdfComponent = () => {
  const componentRef = useRef(null);

  const generatePDF = async () => {
    const input = componentRef.current;

    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      // pdf.save("table.pdf");

      // Convert the PDF to base64 string
      const base64String = pdf.output("datauristring");
      console.log(base64String);

      return base64String;
    }
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

      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default PdfComponent;

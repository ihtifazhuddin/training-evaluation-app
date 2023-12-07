import React, { useRef } from "react";
import { Paper } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TrainingDetails from "../components/TrainingDetails";
import StaffDetails from "../../components/StaffDetails";
import WriteEvaluation from "../pages/staff/WriteEvaluation";
import EvaluationDetails from "../../components/EvaluationDetails";
import EvaluationField from "../components/EvaluationField";

const PdfComponent = () => {
  const componentRef = useRef(null);

  const generatePDF = async () => {
    const input = componentRef.current;

    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("table.pdf");
    }
  };

  return (
    <div>
      <Paper
        elevation={3}
        ref={componentRef}
        style={{ padding: "20px", marginBottom: "20px" }}
      >
        <EvaluationDetails />
        <EvaluationField />
      </Paper>

      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default PdfComponent;

import React, { useRef, useState } from "react";
import {
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import html2canvas from "html2canvas";
import EvaluationField from "../staff/components/EvaluationField";
import { useEffect } from "react";

export const DisplayPreview = () => {
  const componentRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [imgDataHtml, setImgDataHtml] = useState("");

  const generatePreview = async () => {
    console.log("Generating PDF...");

    const input = componentRef.current;
    console.log("input", input);

    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const imgDataHtml = `<html><body><img src="${imgData}" width="100%" height="100%"></body></html>`;
      setImgDataHtml(imgDataHtml);
      setOpen(true);
    }
  };

  useEffect(() => {
    generatePreview();
  }, []);

  const handleClose = () => {
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
      <button onClick={generatePreview}>Preview</button>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle>Preview</DialogTitle>
        <DialogContent>
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

// export default DisplayPreview;

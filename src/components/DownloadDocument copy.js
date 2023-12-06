import { useState, useEffect } from "react";

export const DownloadDocument = async () => {
  const accessToken = localStorage.getItem("access_token");
  const contractnum = localStorage.getItem("contractnum");

  const [dataStreamBytes, setDataStreamBytes] = useState(null);

  useEffect(() => {
    if (dataStreamBytes) {
      handleDownload();
    }
  });

  try {
    const formData = new FormData();
    formData.append("accessToken", accessToken);
    formData.append("contractnum", contractnum);

    // Make API call with the FormData
    const response = await fetch("http://127.0.0.1:5000/download-document", {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    // Handle the response
    if (responseData.result === 0) {
      console.log("Get data stream byte is successful:", responseData);
      setDataStreamBytes(responseData.data);
    } else {
      console.error("Get data stream byte is failed:", responseData);
      return "Get data stream byte is failed";
    }
  } catch (error) {
    console.error("Error during API call:", error);
  }

  const handleDownload = () => {
    // Decode base64 to bytes
    const dataStreamBytesForBlob = new Uint8Array(
      atob(dataStreamBytes)
        .split("")
        .map((char) => char.charCodeAt(0))
    );

    // Create a Blob from the bytes
    const blob = new Blob([dataStreamBytesForBlob], {
      type: "application/pdf",
    });

    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "signingcloud.pdf";

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
  };
};

// export default DownloadDocument;

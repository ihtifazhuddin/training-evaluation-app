export const DownloadDocument = async () => {
  const accessToken = localStorage.getItem("access_token");
  const contractnum = localStorage.getItem("contractnum");

  // To name the downloaded file
  const training_name = localStorage.getItem("training_name");
  const staff_name = localStorage.getItem("staff_name");

  const handleDownload = (dataStreamBytes) => {
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

    // Set the file name
    const currentDate = new Date()
      .toISOString()
      .slice(2, 19)
      .replace(/[-T:]/g, "");
    const formattedTrainingName = training_name.replace(/\s/g, "");
    const formattedStaffName = staff_name.replace(/\s/g, "");
    link.download = `${currentDate}-${formattedTrainingName}-${formattedStaffName}.pdf`;

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
  };

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
      console.log("Successfully get data stream byte");
      handleDownload(responseData.data);
    } else {
      console.error("Fail to get data stream byte");
    }
  } catch (error) {
    console.error("Error during API call:", error);
  }
};

// export default DownloadDocument;

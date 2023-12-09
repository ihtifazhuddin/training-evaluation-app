export const GetPreviewLink = async () => {
  const accessToken = localStorage.getItem("access_token");
  const contractnum = localStorage.getItem("contractnum");

  try {
    const formData = new FormData();
    formData.append("accessToken", accessToken);
    formData.append("contractnum", contractnum);

    // Make API call with the FormData
    const response = await fetch("http://127.0.0.1:5000/get-contract-details", {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    // Handle the response
    if (responseData.result === 0) {
      console.log("Get contract details is successful:", responseData);
      const link = responseData.data.contractDetails.previewurl;
      return link; // Return the desired value
    } else {
      console.error("Get contract details is failed:", responseData);
    }
  } catch (error) {
    console.error("Error during API call:", error);
  }
};

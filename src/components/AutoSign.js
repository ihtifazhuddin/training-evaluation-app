const AutoSign = async () => {
  const accessToken = localStorage.getItem("access_token");
  const contractnum = localStorage.getItem("contractnum");

  const staff_email = localStorage.getItem("staff_email");
  const staff_keyword = localStorage.getItem("staff_keyword");

  const signer = [
    {
      email: staff_email,
      signkeyword: staff_keyword,
    },
  ];

  try {
    // Construct the FormData object
    const formData = new FormData();
    formData.append("accessToken", accessToken);
    formData.append("contractnum", contractnum);
    formData.append("signer", JSON.stringify(signer));

    // Make API call with the FormData
    const response = await fetch(
      "http://127.0.0.1:5000/auto_sign_signature_process_userbased",
      {
        method: "POST",
        body: formData,
      }
    );

    const responseData = await response.json();

    // Handle the response
    if (responseData.result === 0) {
      console.log("Auto Sign is successful:", responseData);

      return "Auto sign is successful";
    } else {
      console.error("Auto Sign is failed:", responseData);
      return "Auto sign is failed";
    }
  } catch (error) {
    console.error("Error during API call:", error);
  }
};

export default AutoSign;

const UploadDocument = async () => {
  const access_token = localStorage.getItem("access_token");
  const filename = localStorage.getItem("filename");

  // Get staff data
  const staff_name = localStorage.getItem("staff_name");
  const staff_phonesn = "+60111111111";
  const staff_caprovide = 1;
  const staff_email = localStorage.getItem("staff_email");
  const staff_authtype = 0;

  // Get HR data
  const hr_name = localStorage.getItem("hr_name");
  const hr_phonesn = "+60222222222";
  const hr_caprovide = 1;
  const hr_email = localStorage.getItem("hr_email");
  const hr_authtype = 0;

  const signerInfo = [
    {
      name: staff_name,
      phonesn: staff_phonesn,
      caprovide: staff_caprovide,
      email: staff_email,
      authtype: staff_authtype,
    },
    {
      name: hr_name,
      phonesn: hr_phonesn,
      caprovide: hr_caprovide,
      email: hr_email,
      authtype: hr_authtype,
    },
  ];

  try {
    // Construct the FormData object
    const formData = new FormData();
    formData.append("accessToken", access_token);
    formData.append("filename", filename);
    formData.append("signersinfo", JSON.stringify(signerInfo));

    // Make API call with the FormData
    const response = await fetch(
      "http://127.0.0.1:5000/upload_doc_multisigner",
      {
        method: "POST",
        body: formData,
      }
    );

    const responseData = await response.json();

    // Handle the response
    if (responseData.result === 0) {
      console.log("Upload document successful:", responseData);
      localStorage.setItem("contractnum", responseData.data.contractnum);
    } else {
      console.error("Upload document failed:", responseData);
    }
  } catch (error) {
    console.error("Error during API call:", error);
  }
};

export default UploadDocument;

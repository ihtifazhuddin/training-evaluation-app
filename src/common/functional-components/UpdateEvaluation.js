export const UpdateEvaluation = async () => {
  const evaluation_id = localStorage.getItem("evaluation_id");

  try {
    const formData = new FormData();
    formData.append("evaluation_id", evaluation_id);

    // Make API call with the FormData
    const response = await fetch("http://127.0.0.1:5000/update-evaluation", {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    // Handle the response
    if (responseData.result === 0) {
      console.log("Update evaluation is successful:", responseData);
    } else {
      console.error("Update evaluation is failed:", responseData);
    }
  } catch (error) {
    console.error("Error during API call:", error);
  }
};

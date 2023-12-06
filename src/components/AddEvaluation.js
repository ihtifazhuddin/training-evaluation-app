const AddEvaluation = async () => {
  const contractnum = localStorage.getItem("contractnum");
  const training_id = localStorage.getItem("training_id");
  const staff_id = localStorage.getItem("staff_id");

  try {
    // Construct the FormData object
    const formData = new FormData();
    formData.append("contractnum", contractnum);
    formData.append("training_id", training_id);
    formData.append("staff_id", staff_id);

    // Make API call with the FormData
    const response = await fetch("http://127.0.0.1:5000/add-evaluation", {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    // Handle the response
    if (responseData.result === 0) {
      console.log("Add evaluation successful:", responseData);
    } else {
      console.error("Add evaluation failed:", responseData);
    }
  } catch (error) {
    console.error("Error during API call:", error);
  }
};

export default AddEvaluation;

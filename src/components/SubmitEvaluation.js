import { useNavigate } from "react-router-dom";
import UploadDocument from "./UploadDocument";
import AutoSign from "./AutoSign";
import AddEvaluation from "./AddEvaluation";

export const SubmitEvaluation = async () => {
  const navigate = useNavigate();

  try {
    await UploadDocument(); // Wait for UploadDocument to complete

    await AddEvaluation(); // Wait for AddEvaluation to complete

    await AutoSign(); // Wait for AutoSign to complete

    navigate("/staff/evaluations");
  } catch (error) {
    console.error("Error submitting evaluation:", error);
  }
};

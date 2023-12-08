import React from "react";
import MainLayout from "../../common/MainLayout";
import TrainingDetails from "../components/TrainingDetails";
import EvaluationField from "../components/EvaluationField";
import SignatureBox from "../components/SignatureBox";
import { DisplayPreview } from "../../components/DisplayPreview";
import { SubmitEvaluation } from "../../components/SubmitEvaluation";
// import { useNavigate } from "react-router-dom";
import { Button, ThemeProvider } from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#0063F7",
    },
  },
});

const StyledContainer = styled("div")({
  margin: "20px",
});

const StyledTextRight = styled("div")({
  textAlign: "left",
  marginBottom: "20px",
});

const StyledButton = styled(Button)({
  marginLeft: "15px",
  marginTop: "5px",
  fontSize: "12px",
});

const CreateEvaluation = () => {
  // const navigate = useNavigate();

  const generateXLXS = async () => {
    const staff_name = localStorage.getItem("staff_name");
    const trainer_name = localStorage.getItem("training_trainer");
    const training_name = localStorage.getItem("training_title");
    const division = localStorage.getItem("staff_division");
    const date = localStorage.getItem("training_date");
    const venue = localStorage.getItem("training_venue");

    const rating_1 = localStorage.getItem("rating_1");
    const rating_2 = localStorage.getItem("rating_2");
    const rating_3 = localStorage.getItem("rating_3");
    const rating_4 = localStorage.getItem("rating_4");
    const rating_text_5 = localStorage.getItem("rating_text_5");
    const rating_text_6 = localStorage.getItem("rating_text_6");
    const rating_7 = localStorage.getItem("rating_7");

    const staff_keyword = localStorage.getItem("staff_keyword");
    const staff_role = localStorage.getItem("staff_role");
    const HR_name = localStorage.getItem("hr_name");
    const HR_keyword = localStorage.getItem("hr_keyword");
    const HR_role = localStorage.getItem("hr_role");

    const payloadData = [
      {
        staff_name: staff_name,
        trainer_name: trainer_name,
        training_name: training_name,
        division: division,
        date: date,
        venue: venue,
        rating_1: rating_1,
        rating_2: rating_2,
        rating_3: rating_3,
        rating_4: rating_4,
        rating_text_5: rating_text_5,
        rating_text_6: rating_text_6,
        rating_7: rating_7,
        staff_keyword: staff_keyword,
        staff_role: staff_role,
        HR_name: HR_name,
        HR_keyword: HR_keyword,
        HR_role: HR_role,
      },
    ];

    try {
      // Construct the FormData object
      const formData = new FormData();
      formData.append("payload_data", JSON.stringify(payloadData));

      // Make API call with the FormData
      const response = await fetch("http://127.0.0.1:5000/generateXLXS", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      // Handle the response
      if (responseData.result === "success") {
        console.log("API call successful:", responseData);
        localStorage.setItem("filename", responseData.data.filename);
        // navigate("/staff/review");
      } else {
        console.error("API call failed:", responseData);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handlePreview = async () => {
    try {
      await DisplayPreview();
    } catch (error) {}
  };

  const handleSubmit = async () => {
    try {
      await generateXLXS();
      await SubmitEvaluation();
    } catch (error) {}
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <MainLayout>
        <StyledContainer>
          <TrainingDetails />
          <EvaluationField />
          <SignatureBox />
        </StyledContainer>

        <StyledTextRight>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => handlePreview()}
          >
            Preview
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
          >
            Submit and Sign
          </StyledButton>
        </StyledTextRight>
      </MainLayout>
    </ThemeProvider>
  );
};

export default CreateEvaluation;

import React, { useState, useEffect } from "react";
import {
  Paper,
  Rating,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";

const EvaluationField = () => {
  const [rating_1, setRating_1] = useState(0);
  const [rating_2, setRating_2] = useState(0);
  const [rating_3, setRating_3] = useState(0);
  const [rating_4, setRating_4] = useState(0);
  const [rating_text_5, setRatingText_5] = useState("");
  const [rating_text_6, setRatingText_6] = useState("");
  const [rating_7, setRating_7] = useState(0);

  // useEffect to update local storage whenever ratings change
  useEffect(() => {
    localStorage.setItem("rating_1", rating_1);
  }, [rating_1]);

  useEffect(() => {
    localStorage.setItem("rating_2", rating_2);
  }, [rating_2]);

  useEffect(() => {
    localStorage.setItem("rating_3", rating_3);
  }, [rating_3]);

  useEffect(() => {
    localStorage.setItem("rating_4", rating_4);
  }, [rating_4]);

  useEffect(() => {
    localStorage.setItem("rating_text_5", rating_text_5);
  }, [rating_text_5]);

  useEffect(() => {
    localStorage.setItem("rating_text_6", rating_text_6);
  }, [rating_text_6]);

  useEffect(() => {
    localStorage.setItem("rating_7", rating_7);
  }, [rating_7]);

  const handleSetRatingText_5 = (event) => {
    setRatingText_5(event.target.value);
  };

  const handleSetRatingText_6 = (event) => {
    setRatingText_6(event.target.value);
  };

  const handleSetRating_7 = (event) => {
    setRating_7(event.target.value);
  };

  return (
    <Paper style={{ marginTop: "5px" }}>
      <Typography
        variant="h1"
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          fontSize: "16px",
          marginBottom: "5px",
          lineHeight: "25px",
          paddingLeft: "10px",
        }}
      >
        Training Evaluation Form
      </Typography>

      <div>
        <Typography>
          1. How would you rate the relevancy of the training content and your
          current role?
        </Typography>
        <Rating
          name="rating_1"
          value={rating_1}
          style={{ marginLeft: "15px" }}
          onChange={(event, newRating_1) => {
            setRating_1(newRating_1);
          }}
        />
      </div>

      <div>
        <Typography>
          2. How would you rate the presentation about the topic and content?
          (Eg. clear, guided, interactive)
        </Typography>
        <Rating
          name="rating_2"
          value={rating_2}
          style={{ marginLeft: "15px" }}
          onChange={(event, newRating_2) => {
            setRating_2(newRating_2);
          }}
        />
      </div>

      <div>
        <Typography>
          3. How would you rate the overall experience of the training? (Eg:
          venue, material, or visual aid.)
        </Typography>
        <Rating
          name="rating_3"
          value={rating_3}
          style={{ marginLeft: "15px" }}
          onChange={(event, newRating_3) => {
            setRating_3(newRating_3);
          }}
        />
      </div>

      <div>
        <Typography>
          4. How do you rate the duration of the training?
        </Typography>
        <Rating
          name="rating_4"
          value={rating_4}
          style={{ marginLeft: "15px" }}
          onChange={(event, newRating_4) => {
            setRating_4(newRating_4);
          }}
        />
      </div>

      <div>
        <Typography>
          5. How to apply the knowledge/skills gained during the training in
          your current job?
        </Typography>
        <TextField
          name="rating_text_5"
          multiline
          rows={3}
          fullWidth
          value={rating_text_5}
          onChange={handleSetRatingText_5}
        />
      </div>

      <div>
        <Typography>
          6. Please provide general comment about the training.
        </Typography>
        <TextField
          name="rating_text_6"
          multiline
          rows={3}
          fullWidth
          value={rating_text_6}
          onChange={handleSetRatingText_6}
        />
      </div>

      <div>
        <Typography>7. Would you recommend the training to others?</Typography>
        <RadioGroup
          row
          name="value7"
          value={rating_7}
          onChange={handleSetRating_7}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </div>
    </Paper>
  );
};

export default EvaluationField;

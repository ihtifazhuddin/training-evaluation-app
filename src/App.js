import { React, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { fetchAccessToken } from "./components/AccessToken";

// Common pages
import LoginPage from "./common/LoginPage";
import NoPage from "./common/NoPage";

// Staff pages
import TrainingListPage from "./staff/pages/TrainingListPage";
import EvaluationListPage from "./staff/pages/EvaluationListPage";
import CreateEvaluationPage from "./staff/pages/CreateEvaluationPage";
import ReviewDocument from "./staff/pages/ReviewDocumentPage";

// HR pages
import EvaluationListPage2 from "./hr/pages/EvaluationListPage";

// test
import DownloadDocument from "./test-files/TESTdownloadpdf";
import PdfViewer from "./test-files/TEST-preview-pdf";

const App = () => {
  useEffect(() => {
    fetchAccessToken();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NoPage />} />

        {/* Staff pages */}
        <Route path="/staff/trainings" element={<TrainingListPage />} />
        <Route path="/staff/evaluations" element={<EvaluationListPage />} />
        <Route path="/staff/create/" element={<CreateEvaluationPage />} />
        <Route path="/staff/review" element={<ReviewDocument />} />

        {/* HR pages */}
        <Route path="/hr/evaluations" element={<EvaluationListPage2 />} />

        {/* Test page */}
        <Route path="/test/" element={<DownloadDocument />} />
        <Route path="/test2/" element={<PdfViewer />} />
      </Routes>
    </Router>
  );
};

export default App;

import { React, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { fetchAccessToken } from "./common/functional-components/GetAccessToken";

// Common pages
import LoginPage from "./common/components/LoginPage";
import NoPage from "./common/components/NoPage";

// Staff pages
import CreateEvaluationPage from "./staff/pages/CreateEvaluationPage";
import EvaluationListPage from "./staff/pages/EvaluationListPage";
import TrainingListPage from "./staff/pages/TrainingListPage";
// import ReviewDocument from "./staff/pages/ReviewDocumentPage";

// HR pages
import EvaluationListPageHR from "./hr/EvaluationListPage";

// test
// import DownloadDocument from "./test-files/TESTdownloadpdf";
// import PdfViewer from "./test-files/TEST-preview-pdf";

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
        {/* <Route path="/staff/review" element={<ReviewDocument />} /> */}

        {/* HR pages */}
        <Route path="/hr/evaluations" element={<EvaluationListPageHR />} />

        {/* Test page */}
        {/* <Route path="/test/" element={<DownloadDocument />} />
        <Route path="/test2/" element={<PdfViewer />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

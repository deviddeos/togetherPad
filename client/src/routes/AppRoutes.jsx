import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import EditorPage from "../pages/EditorPage";
import VerifyPage from "../pages/VerifyPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/n/:slug" element={<EditorPage />} />
        <Route path="/verify/:slug" element={<VerifyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

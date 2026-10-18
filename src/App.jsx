import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Work from "./pages/Work";

import "./App.css";

function NotFound() {
  return (
    <main className="page-placeholder">
      <p className="eyebrow">RAHUL EDITING / PORTFOLIO</p>
      <h1>
        Page Not Found<span>.</span>
      </h1>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Work />} />

        {/* Old /contact address now opens the home page at the contact section */}
        <Route
          path="/contact"
          element={<Navigate to="/" state={{ scrollTo: "contact" }} replace />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
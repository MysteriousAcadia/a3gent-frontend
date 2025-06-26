import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route, useLocation } from "react-router";

import LandingPage from "./pages/Landing";
import CreatorsDashboard from "./pages/creators/Dashboard";
import CreateAPI from "./pages/creators/CreateAPI";
import ViewAPIs from "./pages/consumers/ExploreAPIs";
import ChatWithAgent from "./pages/consumers/Chat";
import CreateDocument from "./pages/creators/CreateDocument";
import { useAuth } from "./contexts/AuthContext";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isLanding = location.pathname === "/";

  if (!isLanding && (loading || !user)) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/creators/dashboard" element={<CreatorsDashboard />} />
      <Route path="/creators/create-api" element={<CreateAPI />} />
      <Route path="/creators/create-document" element={<CreateDocument />} />
      <Route path="/consumers/view-apis" element={<ViewAPIs />} />
      <Route path="/consumers/chat-agent" element={<ChatWithAgent />} />
    </Routes>
  );
}

export default App;

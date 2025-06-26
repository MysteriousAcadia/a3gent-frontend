import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router";

import LandingPage from "./pages/Landing";
import CreatorsDashboard from "./pages/creators/Dashboard";
import CreateAPI from "./pages/creators/CreateAPI";
import ViewAPIs from "./pages/consumers/ExploreAPIs";
import ChatWithAgent from "./pages/consumers/Chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/creators/dashboard" element={<CreatorsDashboard />} />
      <Route path="/creators/create-api" element={<CreateAPI />} />
      <Route path="/consumers/view-apis" element={<ViewAPIs />} />
      <Route path="/consumers/chat-agent" element={<ChatWithAgent />} />
    </Routes>
  );
}

export default App;

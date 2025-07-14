import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./Routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
      <SpeedInsights />
    </AuthProvider>
  );
}

export default App;

import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./Routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
      {/* Conditionally render Speed Insights to avoid blocking errors */}
      {process.env.NODE_ENV === 'production' && (
        <SpeedInsights />
      )}
    </AuthProvider>
  );
}

export default App;

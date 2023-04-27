import { CssBaseline, ThemeProvider, Fade } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";

import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // This is the basic implementation of light and darkmode using material UI

  return (
    <div className="app">
    {/*
    Setting up basic routing so that every page will have a nav and 
    side bar which will be provided by the <Layout /> component.

    All the traffic coming to the "/" path will be redirected to 
    the "/dashboard" where the <Dashboard /> component is being 
    rendered.
    */}
      <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

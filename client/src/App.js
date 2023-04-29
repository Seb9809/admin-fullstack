import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

// Import the theme settings object
import { themeSettings } from "./theme";

// Import components for each page/scene
import Layout from "./scenes/layout";
import Dashboard from "./scenes/dashboard";
import Products from "./scenes/products";
import Customers from "./scenes/customers";
import Transactions from "./scenes/transactions";
import Geography from "./scenes/geography";
import Overview from "./scenes/overview";
import Daily from "./scenes/daily";
import Monthly from "./scenes/monthly";
import Breakdown from "./scenes/breakdown";
import Admin from "./scenes/admin";
import Performance from "./scenes/performance";

function App() {
  // Get the current mode (light or dark) from the global state
  const mode = useSelector((state) => state.global.mode);

  // Create a new theme using the current mode and the theme settings object
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // Render the app
  return (
    <div className="app">
      {/* Set up the router */}

      <HashRouter>
        {/* Set up the MUI theme provider */}
        <ThemeProvider theme={theme}>
          {/* Add a CSS baseline */}
          <CssBaseline />

          {/* Define the app routes */}
          <Routes>
            {/* Use the Layout component as a layout for all other routes */}
            <Route element={<Layout />}>
              {/* Set the default route to redirect to the dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Define each of the app's routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "dark" ? "light" : "dark"
    );
  };

  return (
    <div className={theme === "light" ? "light-theme" : ""}>
      <BrowserRouter>
        <Routes>

          {/* Login */}
          <Route
            path="/"
            element={
              <Login
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />

          {/* Login Alias */}
          <Route
            path="/login"
            element={
              <Login
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />

          {/* Register */}
          <Route
            path="/register"
            element={
              <Register
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />

          {/* Protected Chat */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;